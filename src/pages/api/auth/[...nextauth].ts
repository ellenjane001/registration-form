import axios from "axios"
import cookie from 'cookie'
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import KeycloakProvider from "next-auth/providers/keycloak"


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
                try {
                    const u = await axios.post(`${process.env.NEXT_PUBLIC_API}users/login`, ({ ...credentials, cookies: registration }))
                    const { email, first_name, middle_name, last_name, id } = u.data.user
                    const user = {
                        name: `${first_name} ${middle_name} ${last_name}`,
                        email: email,
                        image: null,
                        access_token: u.data.access_token,
                        id: id
                    }
                    if (user) {
                        return user
                    }
                    return null

                } catch (error) {
                    console.log(error)
                }
            },
        }),
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID!,
            clientSecret: process.env.KEYCLOAK_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER,
        })
    ],
    theme: { colorScheme: "auto" },
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
        async session({ session, token }: any) {

            if (session?.user) {
                session.user.id = token.id
                session.user.accessToken = token.accessToken;
            }

            return { ...session };
        },
    },
}

export default NextAuth(authOptions)