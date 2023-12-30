import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_CLIENT_ID!,
      clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.JWT_SECRET_KEY,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
