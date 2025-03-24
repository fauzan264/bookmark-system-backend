import { User } from "@prisma/client";

type RegisterUserRequest = {
    email: string;
    name: string;
    password: string;
}

type LoginUserRequest = {
    email: string;
    password: string;
}

type UserResponse = {
    email: string;
    name: string;
    token?: string;
}

function toUserResponse(user: User): UserResponse {
    return {
        email: user.email,
        name: user.name,
    }
}

export {
    RegisterUserRequest,
    LoginUserRequest,
    UserResponse,
    toUserResponse
}