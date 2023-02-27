import axios from "axios"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    pages:{
        signIn:'/login'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await axios.post("/users/login", { credentials })
                const user = res.data
                // If no error and we have user data, return it
                if (res.status === 200 && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    theme: {
        colorScheme: "light",
    },
    callbacks: {
        async jwt({ token }) {
            token.userRole = "admin"
            return token
        },
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
}

export default NextAuth(authOptions)