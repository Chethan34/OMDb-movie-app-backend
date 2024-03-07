export const config = () => ({
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
});
