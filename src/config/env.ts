import "dotenv/config"

export const env = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "default_access_secret",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret"
}