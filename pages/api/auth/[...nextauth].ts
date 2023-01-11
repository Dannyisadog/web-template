import NextAuth from "next-auth"
import GithubProvider from "./GithubProvider";
import { SigninUserProps } from "types/nextauth/SigninCallbackProps";
import { create as createUser, findUserByEmail } from "../service/User";

export const authOptions = {
  pages: {
    signIn: '/signin',
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider
  ],
  callbacks: {
    async signIn({ user }: {user: SigninUserProps}) {
      try {
        const { email } = user;

        const foundUser = await findUserByEmail(email);
        
        if (!foundUser) {
          createUser(user);
        }
      } catch {
        return false;
      }

      return true
    },
  }
}
export default NextAuth(authOptions)