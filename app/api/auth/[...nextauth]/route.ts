import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";

export const authOptions: any = {
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

          // Удалим пароль перед возвратом
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (err) {
          console.error("Ошибка авторизации:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider === "credentials") {
        return true;
      }

      // Раскомментируй ниже, если используешь GitHub или Google
      /*
      if (account?.provider === "github" || account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findFirst({
            where: { email: user.email! },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                id: nanoid(),
                email: user.email!,
              },
            });
          }

          return true;
        } catch (err) {
          console.log("Ошибка при сохранении пользователя", err);
          return false;
        }
      }
      */

      return false; // защита от других провайдеров
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };