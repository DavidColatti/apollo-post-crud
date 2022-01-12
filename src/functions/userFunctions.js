import { pick } from "lodash";
import { sign } from "jsonwebtoken";
import { SECRET } from "../config";

export const issueToken = async (user) => {
  const token = await sign(user, SECRET, { expiresIn: 60 * 60 * 24 });
  return `Bearer ${token}`;
};

export const serializeUser = (user) => {
  return pick(user, [
    "id",
    "email",
    "username",
    "firstName",
    "lastName",
    "avatarImage",
  ]);
};
