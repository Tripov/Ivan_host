import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Учетные данные",
      credentials: {
        email: { label: "Электронная почта", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (!user || !user.password) return null;

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) return null;

          const { password, ...userWithoutPassword } = user;

          return userWithoutPassword;
        } catch (err) {
          console.error("Ошибка авторизации:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // если хочешь настроить кастомную страницу входа
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };