import "dotenv/config";

export const config = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1/users-db"
}