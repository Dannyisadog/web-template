import NextAuth from "next-auth"
import GithubProvider from "./GithubProvider";

export const authOptions = {
  pages: {
    signIn: '/signin',
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider
  ],
}
export default NextAuth(authOptions)