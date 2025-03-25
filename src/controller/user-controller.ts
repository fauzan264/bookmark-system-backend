import { Hono } from "hono";
import { RegisterUserRequest, LoginUserRequest, toUserResponse } from "../model/user-model";
import { UserService } from "../service/user-service";
import { ApplicationVariable } from "../model/app-model";
import { User } from "@prisma/client";
import { authMiddleware } from "../middleware/auth-middleware";

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

userController.use(authMiddleware)

userController.get("/users/session", async (c) => {
    const user = c.get("user") as User

    return c.json({
        data: toUserResponse(user)
    })
})

export { userController }