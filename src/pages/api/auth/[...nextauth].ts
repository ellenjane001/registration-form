import axios from "axios"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import cookie from 'cookie'
export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req): Promise<any> {
                const { registration } = cookie.parse(req.headers!.cookie)
                let count = 0
                try {
                    const u = await axios.post(`${process.env.NEXT_PUBLIC_API}users/login`, ({ ...credentials, cookies: JSON.parse(registration) }))
                    const { username, email, first_name, middle_name, last_name } = u.data.user
                    const user = {
                        name: username,
                        email: email,
                        image: null,
                        full_name: `${first_name} ${middle_name} ${last_name}`,
                        access_token: u.access_token
                    }
                    if (user) {
                        return user
                    } else {
                        return null
                    }
                } catch (error) {
                    console.log(error)
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.account = {
                    ...account
                };
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user!.id = token.id;
            session.accessToken = token.accessToken;
            return { ...session };
        },
    },
}

export default NextAuth(authOptions)