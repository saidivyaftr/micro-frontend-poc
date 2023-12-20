// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import fetchAdapter from '@vespaiach/axios-fetch-adapter'
import axios from 'axios'
import { AppRoutes, isPostLoginRoute } from './constants'

const axiosInstance = axios.create({
  adapter: fetchAdapter,
})

const shouldRedirectToWelcomePage = (services: any[]) => {
  if (!services?.length) {
    return false
  }
  // If it has billing account, return false
  const hasBillingAccount = services?.find(
    (service: { type: string }) => service.type === 'BILLING',
  )
  if (hasBillingAccount) {
    return false
  }

  const isUnProvisionedServicesFound = services?.find(
    (service: { type: string }) =>
      service.type === 'UNPROVISIONED' || service.type === 'BSS_RESULT',
  )
  return Boolean(isUnProvisionedServicesFound)
}

const redirectAfterCheck = (req: NextRequest, data: any) => {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }
  const pathname = req?.nextUrl?.pathname

  // Redirect to these pages that are not post-login pages or requires different post-login redirects
  if (
    pathname?.includes('account/frontier-id-disabled') ||
    pathname?.includes('account/password-link-expired') ||
    pathname?.includes('account/services')
  ) {
    return NextResponse.next()
  }

  const showWelcomePage = shouldRedirectToWelcomePage(data?.services)
  const isLoggedIn = Boolean(data?.loggedIn)
  const loggedInPath = showWelcomePage
    ? AppRoutes.WelcomePage
    : AppRoutes.AccountPage

  const postLoginRoute = isPostLoginRoute(pathname)

  // If user is logged in
  if (isLoggedIn) {
    if (pathname?.includes('login')) {
      return NextResponse.redirect(new URL(loggedInPath, req.url))
    }

    // Welcome page
    if (pathname?.includes('account/welcome')) {
      if (!showWelcomePage) {
        return NextResponse.redirect(new URL(AppRoutes.AccountPage, req.url))
      } else {
        return NextResponse.next()
      }
    }

    if (postLoginRoute) {
      if (showWelcomePage) {
        return NextResponse.redirect(new URL(AppRoutes.WelcomePage, req.url))
      }
    }

    return NextResponse.next()
  }

  // Non logged in routing
  return postLoginRoute
    ? NextResponse.redirect(new URL(AppRoutes.LoginPage, req.url))
    : NextResponse.next()
}

export async function middleware(req: NextRequest) {
  try {
    const isDev = req.nextUrl?.origin?.includes('localhost')
    const sidCookie = req.cookies.get('connect.sid') ?? false
    if (sidCookie) {
      const cookieString = `connect.sid=${sidCookie};`
      const baseURL = isDev
        ? process.env.DOTCOM_URL
        : `${req?.nextUrl?.origin}/`
      const response = await axiosInstance(`${baseURL}api/session`, {
        headers: { cookie: cookieString },
      })
      return redirectAfterCheck(req, response?.data)
    } else {
      return redirectAfterCheck(req, false)
    }
  } catch {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/login', '/account/:path*'],
}
