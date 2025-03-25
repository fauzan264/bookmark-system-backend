import { Category } from "@prisma/client";

type CreateCategoryRequest = {
    name: string;
}

type UpdateCategoryRequest = {
    id: number;
    name: string;
}

type RemoveCategoryRequest = {
    id: number;
}

type CategoryResponse = {
    id: number;
    name: string;
}

function toCategoryResponse(category: Category): CategoryResponse {
    return {
        id: category.id,
        name: category.name
    }
}

export {
    CreateCategoryRequest,
    UpdateCategoryRequest,
    RemoveCategoryRequest,
    CategoryResponse,
    toCategoryResponse,
}