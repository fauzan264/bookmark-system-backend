import * as jwt from "jsonwebtoken";
import { prismaClient } from "../config/database";
import { LoginUserRequest, RegisterUserRequest, toUserResponse, UserResponse } from "../model/user-model";
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

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        request = UserValidation.LOGIN.parse(request)

        let user = await prismaClient.user.findUnique({
            where: {
                email: request.email,
            }
        })

        if (!user) {
            throw new HTTPException(401, {
                message: "Username or password is wrong",
            })
        }

        const isPasswordValid = await Bun.password.verify(request.password, user.password, "bcrypt")
        if (!isPasswordValid) {
            throw new HTTPException(401, {
                message: "Username or password is wrong",
            })
        }

        // user = await prismaClient.user.update({
        //     where: {
        //         email: request.email,
        //     },
        //     data: {
        //         token: crypto.randomUUID()
        //     }
        // })
        const token = jwt.sign(
            { userID: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        )

        const response = toUserResponse(user)
        response.token = token
        return response
    }
}

export { UserService }