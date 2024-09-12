import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  PORT: get('PORT').required().asPortNumber(),
};
