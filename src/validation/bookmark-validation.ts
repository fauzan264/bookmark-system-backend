import { z, ZodType } from "zod";

class BookmarkValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).max(100),
        url: z.string().url(),
        user_id: z.number().positive(),
        category_id: z.number().positive(),
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        title: z.string().min(1).max(100).optional(),
        url: z.string().url().optional(),
        category_id: z.number().positive().optional(),
    })

    static readonly REMOVE: ZodType = z.object({
        id: z.number().positive(),
    })

    static readonly GET: ZodType = z.object({
        id: z.number().positive(),
    })

    static readonly LIST: ZodType = z.object({
        search: z.string().optional(),
        category_id: z.number().positive().optional(),
        user_id: z.number().positive().optional(),
        page: z.number().positive().optional(),
        limit: z.number().positive().optional(),
    })
}

export { BookmarkValidation }