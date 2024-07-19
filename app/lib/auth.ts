import type { NextAuthOptions} from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword!);
        if (!passwordMatch) return null;

        // Include additional fields like labId here
        const { id, name, email, labId } = user;

        return {
          id: id.toString(),
          name,
          email,
          labId,
        };
      }
    }),
    
  ],
  session: {
    strategy: "jwt",
    // Optional: Adjust JWT handling here if needed
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        
        token.name = user.name;
        token.email = user.email;
        token.labId = user.labId; // Include additional fields like labId
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};