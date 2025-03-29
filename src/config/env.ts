const env = process.env;

export const envs = {
    port: env.PORT,
    dbUrl: env.DATABASE_URL,
};
