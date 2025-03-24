import { prismaClient } from "../config/database";
import { RegisterUserRequest, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation.ts/user-validation";
import { HTTPException } from "hono/http-exception";

class UserService {
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        request = UserValidation.REGISTER.parse(request)

        const totalUserWithSameEmail = await prismaClient.user.count({
            where: {
                email: request.email,
            }
        })

        if (totalUserWithSameEmail != 0) {
            throw new HTTPException(400, {
                message: "Email already exists"
            });
        }

        request.password = await Bun.password.hash(request.password, {
            algorithm: "bcrypt",
            cost: 10
        })

        const user = await prismaClient.user.create({
            data: request
        })

        return toUserResponse(user)
    }
}

export { UserService }