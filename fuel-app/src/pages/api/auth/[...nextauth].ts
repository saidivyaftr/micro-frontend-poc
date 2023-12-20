/* eslint-disable no-unused-vars */
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const MAXAGE = 60 * 30 //30 mins

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return { id: profile?.sub || '1234' }
      },
      idToken: false,
      userinfo: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        request: () => {
          return {}
        },
      },
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope:
            'https://www.googleapis.com/auth/youtube.commerce.partnership.integrated-billing',
        },
      },
    }),
  ],
  session: {
    maxAge: MAXAGE,
  },
  jwt: {
    maxAge: MAXAGE,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        return url
      }
      return url
    },

    jwt: ({ token, account }) => {
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      return token
    },
    session: async ({ session, token }) => {
      //session.user = user
      session.token = token
      return session
    },
  },
  //FOR DEBUGGING
  //debug: true,
  // logger: {
  //   error(code, metadata) {
  //     console.log(code, metadata)
  //   },
  //   warn(code) {
  //     console.log(code)
  //   },
  //   debug(code, metadata) {
  //     console.log(code, metadata)
  //   },
  // },
})
