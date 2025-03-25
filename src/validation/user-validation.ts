import { password } from "bun";
import { z, ZodType } from "zod";

class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        email: z.string().email().min(10).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1).max(100),
    })

    static readonly LOGIN: ZodType = z.object({
        email: z.string().email().min(10).max(100),
        password: z.string().min(1).max(100),
    })
    
    static readonly TOKEN: ZodType = z.string().min(1)
}

export { UserValidation }