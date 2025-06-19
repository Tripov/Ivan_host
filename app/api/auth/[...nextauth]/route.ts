import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";

export const authOptions: any = {
  // Настройка одного или нескольких провайдеров аутентификации
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Учетные данные",
      credentials: {
        email: { label: "Электронная почта", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials: any) {

        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password!
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    })
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID ?? "",
    //   clientSecret: process.env.GOOGLE_SECRET ?? "",
    // }),
    // ...добавьте больше провайдеров здесь, если хотите. Вы можете найти их на сайте nextauth.
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      // if (account?.provider == "github") {

      //   try {
      //     const existingUser = await prisma.user.findFirst({ where: {email: user.email!} });
      //     if (!existingUser) {

      //       await prisma.user.create({
      //           data: {
      //             id: nanoid() + "",
      //             email: user.email!
      //           },
      //         });
      //       return true;
      //     }
      //     return true;
      //   } catch (err) {
      //     console.log("Ошибка при сохранении пользователя", err);
      //     return false;
      //   }
      // }

      // if (account?.provider == "google") {

      //   try {
      //     const existingUser = await prisma.user.findFirst({where: { email: user.email! }});
      //     if (!existingUser) {
      //       await prisma.user.create({
      //           data: {
      //             id: nanoid() + "",
      //             email: user.email!
      //           },
      //         });

      //       return true;
      //     }
      //     return true;
      //   } catch (err) {
      //     console.log("Ошибка при сохранении пользователя", err);
      //     return false;
      //   }
      // }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
