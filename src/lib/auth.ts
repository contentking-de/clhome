import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";
import { prisma } from "./prisma";

const MAX_TOKEN_USES = 2;

const baseAdapter = PrismaAdapter(prisma);

const adapter = {
  ...baseAdapter,
  async useVerificationToken(identifier_token: {
    identifier: string;
    token: string;
  }) {
    try {
      const existing = await prisma.verificationToken.findUnique({
        where: { identifier_token },
      });

      if (!existing) return null;

      if (existing.useCount + 1 >= MAX_TOKEN_USES) {
        const deleted = await prisma.verificationToken.delete({
          where: { identifier_token },
        });
        return {
          identifier: deleted.identifier,
          token: deleted.token,
          expires: deleted.expires,
        };
      }

      const updated = await prisma.verificationToken.update({
        where: { identifier_token },
        data: { useCount: { increment: 1 } },
      });
      return {
        identifier: updated.identifier,
        token: updated.token,
        expires: updated.expires,
      };
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "P2025"
      )
        return null;
      throw error;
    }
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
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
