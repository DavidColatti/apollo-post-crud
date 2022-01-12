import { config } from "dotenv";

const { parsed } = config();
export const {
  PORT,
  MODE,
  SECRET,
  BASE_URL,
  MONGODB_URI,
  URL = `${BASE_URL}${PORT}`,
  IN_PROD = MODE === "prod",
} = parsed;
