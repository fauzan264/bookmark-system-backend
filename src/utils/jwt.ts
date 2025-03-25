import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"; // Gantilah dengan secret key asli

export class JWT {
    static sign(payload: object, expiresIn = "1h"): string {
        return jwt.sign(payload, SECRET_KEY, { expiresIn });
    }

    static verify(token: string): any {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (error) {
            return null;
        }
    }
}
