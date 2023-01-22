import NextAuth from "next-auth"
import CredentialProvider from "./CredentialProvider";
import GithubProvider from "./GithubProvider";
import { create as createUser, findUserByEmail } from "../service/User";
import User from "types/next-auth";

export const authOptions = {
  pages: {
    signIn: '/signin',
  },
  // Configure one or more authentication providers
  providers: [
    CredentialProvider,
    GithubProvider
  ],
  callbacks: {
    async signIn({ user }: { user: User}) {
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