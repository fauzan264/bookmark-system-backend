import { prismaClient } from "../src/config/database";

class UserTest {
    static async create() {
        await prismaClient.user.create({
            data: {
                email: "testing@mail.com",
                name: "testing",
                password: await Bun.password.hash("testing", {
                    algorithm: "bcrypt",
                    cost: 10
                }),
                token: "testing"
            }
        })
    }

    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                email: "testing@mail.com"
            }
        })
    }
}

export {
    UserTest,
}