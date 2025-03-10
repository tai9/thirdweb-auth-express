import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ThirdwebAuth } from "@thirdweb-dev/auth/express";
import userService from "../services/user.service";
import { User } from "../entities";

export const { authRouter, authMiddleware, getUser } = ThirdwebAuth({
  domain: process.env.THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  // NOTE: All these callbacks are optional! You can delete this section and
  // the Auth flow will still work.
  callbacks: {
    onLogin: async (address, req) => {
      // Here we can run side-effects like creating and updating user data
      // whenever a user logs in.
      let findUser = await userService.getUserByAddress(address);
      if (!findUser) {
        const user = new User();
        user.walletAddress = address;
        findUser = await userService.createUser(user);
      }

      // We can also provide any session data to store in the user's session.
      const session = { role: ["admin"], userId: findUser.id };
      req.session.user = findUser;
      return session;
    },
    onUser: async (user, req) => {
      // Here we can run side-effects whenever a user is fetched from the client side
      const userFound = await userService.getUserByAddress(user.address);
      if (!userFound) return null;
      // And we can provide any extra user data to be sent to the client
      // along with the default user object.
      req.session.user = userFound;
      return userFound.name;
    },
    onLogout: async (user, req) => {
      // Finally, we can run any side-effects whenever a user logs out.
      return req.session.destroy(() => {
        return true;
      });
    },
  },
});
