import { Category, User } from "@prisma/client";
import { CategoryResponse, CreateCategoryRequest, RemoveCategoryRequest, toCategoryResponse, UpdateCategoryRequest } from "../model/category-model";
import { CategoryValidation } from "../validation/category-validation";
import { prismaClient } from "../config/database";
import { HTTPException } from "hono/http-exception";

class CategoryService {
    static async list(user: User): Promise<CategoryService> {
        const categories = await prismaClient.category.findMany({})

        return categories.map(category => toCategoryResponse(category))
    }

    static async create(user: User, request: CreateCategoryRequest): Promise<CategoryService> {
        request = CategoryValidation.CREATE.parse(request)

        const category = await prismaClient.category.create({
            data: request
        })

        return toCategoryResponse(category)
    }

    static async categoryMustExists(categoryId: number): Promise<Category> {
        const category = await prismaClient.category.findFirst({
            where: {
                id: categoryId
            }
        })

        if (!category) {
            throw new HTTPException(404, {
                message: "Category is not found"
            })
        }

        return category
    }

    static async update(user: User, request: UpdateCategoryRequest): Promise<CategoryResponse> {
        request = CategoryValidation.UPDATE.parse(request)
        await this.categoryMustExists(request.id)
        
        const category = await prismaClient.category.update({
            where: {
                id: request.id
            },
            data: request
        })

        return toCategoryResponse(category)
    }


    static async remove(user: User, request: RemoveCategoryRequest): Promise<CategoryService> {
        request = CategoryValidation.REMOVE.parse(request)

        await prismaClient.category.delete({
            where: {
                id: request.id
            }
        })

        return true
    }
}

export { CategoryService }