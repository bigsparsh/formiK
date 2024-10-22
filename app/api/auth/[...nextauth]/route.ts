import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER as string,
          pass: process.env.EMAIL_SERVER_PASSWORD as string,
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("USER IS HERE\n");
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
        });
        if (existingUser) {
          console.log("TOKEN USER SET TO EXISTING USER\n");
          token.user = existingUser;
        } else {
          console.log("TOKEN USER not SET TO EXISTING USER\n");
        }
      } else {
        console.log("USER IS not HERE\n");
      }
      console.log("\n\n" + JSON.stringify(token) + "\n\n");
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
    verifyRequest:
      "/auth?msg=An email has been sent to your email address use that to verify yourself.",
    newUser: "/dashboard",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
