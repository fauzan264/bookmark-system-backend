import { z, ZodType } from "zod";

class CategoryValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100)
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        name: z.string().min(1).max(100)
    })

    static readonly REMOVE: ZodType = z.object({
        id: z.number().positive(),
    })
}

export { CategoryValidation }