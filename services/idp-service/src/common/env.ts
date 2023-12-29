import {constants} from "./constants";

export const env = (): NodeJS.Process["env"] => ({
  [constants.env.DataSource]: process.env.DATA_SOURCE,
  [constants.env.DbName]: process.env.DB_NAME,
  [constants.env.CryptoSecretKey]: process.env.CRYPTO_SECRET_KEY,
  [constants.env.JwtSecret]: process.env.JWT_SECRET,
});
