import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { LOGIN_USER } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined, req: any) {
        if (!credentials) {
          throw new Error("Missing credentials!");
        }
        const res = await queryRequest(LOGIN_USER, {
          email: credentials.email,
          password: credentials.password,
        });

        // If no error and we have user data, return it
        if (res.success && res.data) {
          return res.data;
        }
        // Return null if user data could not be retrieved
        throw new Error(res?.message || "Invalid credentials!");
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth({
  ...authOptions,
});
