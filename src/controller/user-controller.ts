import { Hono } from "hono";
import { RegisterUserRequest, LoginUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

const userController = new Hono();

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
        data: response
    })
})

export { userController }