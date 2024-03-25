export default {
    port: process.env.PORT || 3000,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE,
    jwt_secret: process.env.JWT_SECRET || "secret",
};
