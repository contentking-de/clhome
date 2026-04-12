import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: process.env.EMAIL_FROM || "clever.legal <noreply@clever.legal>",
    }),
  ],
  pages: {
    signIn: "/admin/login",
    verifyRequest: "/admin/verify",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = (user as any).role;
      }
      return session;
    },
  },
});
