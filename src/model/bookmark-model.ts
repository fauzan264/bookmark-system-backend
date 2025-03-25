import { Bookmark, Category, User } from "@prisma/client"

type ListBookmarksRequest = {
    search?: string
    category_id?: number
    user_id?: number
    page?: number
    limit?: number
}

type CreateBookmarkRequest = {
    title: string
    url: string
    user_id: number
    category_id: number
}

type GetBookmarkRequest = {
    id: number
}

type RemoveBookmarkRequest = {
    id: number
}

type UpdateBookmarkRequest = {
    id: number
    title?: string
    url?: string
    category_id?: number
}

type BookmarkResponse = {
    id: number
    title: string
    url: string
    user: {
        id: number
        email: string
    } | null
    category: {
        id: number
        name: string
    } | null
}

function toBookmarkResponse(bookmark: Bookmark & { user?: User; category?: Category }): BookmarkResponse {
    return {
        id: bookmark.id,
        title: bookmark.title,
        url: bookmark.url,
        user: bookmark.user ? { id: bookmark.user.id, email: bookmark.user.email } : null,
        category: bookmark.category ? { id: bookmark.category.id, name: bookmark.category.name } : null,
    }
}


export {
    ListBookmarksRequest,
    CreateBookmarkRequest,
    GetBookmarkRequest,
    RemoveBookmarkRequest,
    UpdateBookmarkRequest,
    BookmarkResponse,
    toBookmarkResponse,
}