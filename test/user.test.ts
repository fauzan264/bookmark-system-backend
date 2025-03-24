import { describe, it, expect, afterEach } from "bun:test";
import app from "../src";
import { UserTest } from "./test-util";
import { password } from "bun";
import { logger } from "../src/config/logging";

describe('POST /auth/register', () => {
    it('should reject registe new user if request is invalid', async () => {
        afterEach(async () => {
            await UserTest.delete();
        })

        const response = await app.request('/auth/register', {
            method: 'post',
            body: JSON.stringify({
                email: "",
                name: "",
                password: "",
            })
        })

        const body = await response.json()
        logger.debug(body)

        expect(response.status).toBe(400);
        expect(body.errors).toBeDefined();
    })

    it('should reject register new user if email already exists', async () => {
        await UserTest.create();

        const response = await app.request('/auth/register', {
            method: 'post',
            body: JSON.stringify({
                email: "testing@mail.com",
                name: "testing",
                password: "testing",
            })
        })

        const body = await response.json()
        logger.debug(body)

        expect(response.status).toBe(400);
        expect(body.errors).toBeDefined();
    })

    it('should register new user success', async () => {
        const response = await app.request('/auth/register', {
            method: 'post',
            body: JSON.stringify({
                email: "testing@mail.com",
                name: "testing",
                password: "testing",
            })
        })

        const body = await response.json()
        logger.debug(body)

        expect(response.status).toBe(200)
        expect(body.data).toBeDefined()
        expect(body.data.email).toBe("testing@mail.com")
        expect(body.data.name).toBe("testing")
    })
})