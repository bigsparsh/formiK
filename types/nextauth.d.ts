import { AuthProvider } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      email: string;
      name: string | null;
      createdAt: Date;
      updatedAt: Date;
      emailVerified: Date | null;
      image: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: {
      id: string;
      email: string;
      name: string | null;
      createdAt: Date;
      updatedAt: Date;
      emailVerified: Date | null;
      image: string | null;
    };
  }
}
