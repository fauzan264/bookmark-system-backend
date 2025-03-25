import { describe, it, expect, afterEach, beforeEach } from "bun:test";
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

describe('POST /auth/login', () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to login', async () => {
        const response = await app.request('/auth/login', {
            method: 'post',
            body: JSON.stringify({
                email: "testing@mail.com",
                password: "testing"
            })
        })

        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data.token).toBeDefined()
    });

    it('should be rejected if email is wrong', async () => {
        const response = await app.request('/auth/login', {
            method: "post",
            body: JSON.stringify({
                email: "wrong@mail.com",
                password: "test",
            })
        })

        expect(response.status).toBe(401)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    });

    it('should be rejected if password is wrong', async () => {
        const response = await app.request('/auth/login', {
            method: "post",
            body: JSON.stringify({
                email: "testing@mail.com",
                password: "wrong"
            })
        })

        expect(response.status).toBe(401)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    });
})

describe("GET /users/session", () => {
    let token: string;
    beforeEach(async () => {
        await UserTest.create()

        const loginResponse = await app.request("/auth/login", {
            method: "post",
            body: JSON.stringify({
                email: "testing@mail.com",
                password: "testing"
            }),
            headers: { "Content-Type": "application/json" }
        });

        const loginBody = await loginResponse.json();
        token = loginBody.data.token;
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to get user', async () => {
        const response = await app.request('/users/session', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        expect(response.status).toBe(200)

        const body = await response.json()
        expect(body.data).toBeDefined()
        expect(body.data.email).toBeDefined()
        expect(body.data.name).toBeDefined()
    })

    it('should not be able to get user if token is invalid', async () => {
        const response = await app.request('/api/users/current', {
            method: 'get',
            headers: {
                'Authorization': 'wrong'
            }
        })

        expect(response.status).toBe(401)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })

    it('should not be able to get user if there is no Authorization header', async () => {
        const response = await app.request('/api/users/current', {
            method: 'get',
        })

        expect(response.status).toBe(401)

        const body = await response.json()
        expect(body.errors).toBeDefined()
    })
})