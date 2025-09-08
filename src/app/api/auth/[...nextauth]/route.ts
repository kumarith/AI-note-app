
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";


export const authOptions : NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "  Enter your email" },
        password: { label: "Password", type: "password", placeholder: "  Enter your password" },
      },
      async authorize(credentials) {
        try {
            if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        // Here you would typically validate the credentials against your database$
        // Fetch user from DB with Prisma
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });
    console.log("User found:", user);

    if (!user || !user.password) {
      throw new Error("No user found with this email");
    }
     // Compare password (hashed in DB vs provided password)
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return { id: user.id, name: user.name, email: user.email };

        } catch(error){
            throw new Error("Error during authorization");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" 
  },
  callbacks: {
    async session({ session , token } : { session: Session; token: JWT }) {
      if (session.user) {
    session.user.id = token.sub ?? "";
  }
        return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
