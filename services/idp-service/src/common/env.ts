export const env = (): NodeJS.Process["env"] => ({
  DATA_SOURCE: process.env.DATA_SOURCE,
  DB_NAME: process.env.DB_NAME,
});
