import { Bookmark, User } from "@prisma/client";
import { 
    BookmarkResponse, 
    CreateBookmarkRequest, 
    RemoveBookmarkRequest, 
    UpdateBookmarkRequest, 
    toBookmarkResponse 
} from "../model/bookmark-model";
import { BookmarkValidation } from "../validation/bookmark-validation";
import { prismaClient } from "../config/database";
import { HTTPException } from "hono/http-exception";

class BookmarkService {
    static async list(user: User): Promise<BookmarkResponse[]> {
        const bookmarks = await prismaClient.bookmark.findMany({
            where: { user_id: user.id },
            include: { category: true, user: true }
        })

        return bookmarks.map(bookmark => toBookmarkResponse(bookmark))
    }

    static async create(user: User, request: CreateBookmarkRequest): Promise<BookmarkResponse> {
        request = BookmarkValidation.CREATE.parse(request)

        const bookmark = await prismaClient.bookmark.create({
            data: {
                ...request,
                user_id: user.id
            },
            include: { category: true, user: true }
        })

        return toBookmarkResponse(bookmark)
    }

    static async bookmarkMustExists(bookmarkId: number): Promise<Bookmark> {
        const bookmark = await prismaClient.bookmark.findFirst({
            where: { id: bookmarkId },
            include: { category: true, user: true }
        })

        if (!bookmark) {
            throw new HTTPException(404, {
                message: "Bookmark not found"
            })
        }

        return bookmark
    }

    static async getById(user: User, bookmarkId: number): Promise<BookmarkResponse> {
        const bookmark = await prismaClient.bookmark.findFirst({
            where: {
                id: bookmarkId,
                user_id: user.id
            },
            include: { category: true, user: true }
        });
    
        if (!bookmark) {
            throw new HTTPException(404, {
                message: "Bookmark not found"
            });
        }
    
        return toBookmarkResponse(bookmark);
    }

    static async update(user: User, request: UpdateBookmarkRequest): Promise<BookmarkResponse> {
        request = BookmarkValidation.UPDATE.parse(request)
        await this.bookmarkMustExists(request.id)

        const bookmark = await prismaClient.bookmark.update({
            where: { id: request.id },
            data: request,
            include: { category: true, user: true }
        })

        return toBookmarkResponse(bookmark)
    }

    static async remove(user: User, request: RemoveBookmarkRequest): Promise<boolean> {
        request = BookmarkValidation.REMOVE.parse(request)

        await prismaClient.bookmark.delete({
            where: { id: request.id }
        })

        return true
    }
}

export { BookmarkService }