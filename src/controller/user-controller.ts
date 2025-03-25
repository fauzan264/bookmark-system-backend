import { Hono } from "hono";
import { RegisterUserRequest, LoginUserRequest, toUserResponse } from "../model/user-model";
import { UserService } from "../service/user-service";
import { ApplicationVariable } from "../model/app-model";
import { User } from "@prisma/client";

const userController = new Hono<{Variables: ApplicationVariable}>();

userController.post('/auth/register', async(c) => {
    const request = await c.req.json() as RegisterUserRequest;

    const response = await UserService.register(request)

    return c.json({
        data: response
    })
})

userController.post('/auth/login', async(c) => {
    const request = await c.req.json() as LoginUserRequest;

    const response = await UserService.login(request)

    return c.json({
        data: response,
    })
})

userController.use(async (c, next) => {
    const authHeader = c.req.header("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({
            errors: "Unauthorized"
        }, 401)
    }

    const token = authHeader.split(" ")[1]

    try {
        const user = await UserService.get(token)
        c.set("user", user)
        await next()
    } catch (error) {
        return c.json({
            errors: "Invalid or expired token"
        }, 401)
    }

})

userController.get("/users/session", async (c) => {
    const user = c.get("user") as User

    return c.json({
        data: toUserResponse(user)
    })
})

export { userController }