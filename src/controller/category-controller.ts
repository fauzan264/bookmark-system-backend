import { Hono } from "hono";
import { ApplicationVariable } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { User } from "@prisma/client";
import { CreateCategoryRequest, RemoveCategoryRequest, UpdateCategoryRequest } from "../model/category-model";
import { CategoryService } from "../service/category-service";


const categoryController = new Hono<{Variables: ApplicationVariable}>();
categoryController.use(authMiddleware)

categoryController.get('/categories', async(c) => {
    const user = c.get('user') as User
    const response = await CategoryService.list(user)

    return c.json({ data: response })
})

categoryController.post('/categories', async (c) => {
    const user = c.get('user') as User
    const request = await c.req.json() as CreateCategoryRequest
    const response = await CategoryService.create(user, request)

    return c.json({ data: response })
})

categoryController.delete('/categories/:category_id', async (c) => {
    const user = c.get('user') as User
    const request: RemoveCategoryRequest = {
        id: Number(c.req.param('category_id'))
    }
    const response = await CategoryService.remove(user, request)

    return c.json({ data: response })
})

categoryController.put('/categories/:category_id', async (c) => {
    const user = c.get('user') as User
    const categoryId = Number(c.req.param("category_id"))

    const request = await c.req.json() as UpdateCategoryRequest
    request.id = categoryId
    const response = await CategoryService.update(user, request)
    
    return c.json({ data: response })
})



export { categoryController }