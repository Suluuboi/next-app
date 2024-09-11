import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email Adress" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials /*, req*/) {
        if (!credentials?.email || !credentials.password) return null; //throw new Error("Both email and password are required");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null; //throw new Error("User not found.");

        //make sure the provider is an email sign up 1st (will only happen if setion="database")
        const alreadyEmailPasword = await prisma.account.findUnique({
          where: { provider: "email", userId: user.id },
        });

        if (alreadyEmailPasword) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        return passwordsMatch ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
