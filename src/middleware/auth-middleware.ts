import { MiddlewareHandler } from "hono"
import { UserService } from "../service/user-service"

const authMiddleware: MiddlewareHandler = async (c, next) => {
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
}

export { authMiddleware }