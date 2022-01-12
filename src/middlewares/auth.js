import { verify } from "jsonwebtoken";
import { SECRET } from "../config";
import { User } from "../models";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  const notAuthorized = () => {
    req.isAuth = false;
    return next();
  };

  if (!authHeader) {
    return notAuthorized();
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return notAuthorized();
  }

  // Decode the token using verify
  let decodedToken;
  try {
    decodedToken = verify(token, SECRET);
  } catch (err) {
    return notAuthorized();
  }

  if (!decodedToken) {
    return notAuthorized();
  }

  // Find the user from the Database
  const authUser = await User.findById(decodedToken.id);
  if (!authUser) {
    return notAuthorized();
  }

  // Set the req user to the fetched user
  req.user = authUser;
  req.isAuth = true;
  return next();
};

export default authMiddleware;
