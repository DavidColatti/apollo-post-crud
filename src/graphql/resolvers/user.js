import { hash, compare } from "bcryptjs";
import { issueToken, serializeUser } from "../../functions";
import {
  userRegistrationRules,
  userAuthenticationRules,
} from "../../validators";

export default {
  Query: {
    authUserProfile: async (_, {}, { user }) => {
      return user;
    },
    authenticateUser: async (_, { username, password }, { User }) => {
      await userAuthenticationRules.validate(
        { username, password },
        { abortEarly: false }
      );

      // Find user by username
      let user = await User.findOne({ username });
      if (!user) {
        throw new Error("Username not found.");
      }
      // Check for the password
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid password.");
      }
      //Serialize User
      user = user.toObject();
      user.id = user._id;
      user = serializeUser(user);
      // Issue new authentication token
      const token = await issueToken(user);
      return {
        token,
        user,
      };
    },
  },
  Mutation: {
    registerUser: async (_, { newUser }, { User }) => {
      await userRegistrationRules.validate(newUser, { abortEarly: false });

      const { username, email, password } = newUser;
      // First Check if username is already taken
      let user;
      user = await User.findOne({ username });
      if (user) {
        throw new Error("Username is already taken.");
      }
      // If the email is already taken
      user = await User.findOne({ email });
      if (user) {
        throw new Error("Email is already registered.");
      }
      // Create new User Instance
      user = new User(newUser);
      // Hash the password
      user.password = await hash(password, 10);
      // Save the user to the database
      let savedUser = await user.save();
      savedUser = savedUser.toObject();
      savedUser.id = savedUser._id;
      savedUser = serializeUser(savedUser);
      // Issue the Authentication token
      const token = await issueToken(savedUser);
      return {
        token,
        user: savedUser,
      };
    },
  },
};
