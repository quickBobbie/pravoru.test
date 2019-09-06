module.exports = {
    server: {
        port: process.env.SERVER_PORT || 3000
    },
    database: {
        host: process.env.DATABASE_HOST || "localhost",
        port: process.env.DATABASE_PORT || 27017,
        name: process.env.DATABASE_NAME || "default",
        options: {
            useNewUrlParser: true,
            useCreateIndex: true
        }
    }
};