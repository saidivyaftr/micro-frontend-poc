import { Header } from '@/shared-ui/components'
import { render } from '@testing-library/react'
import { useWindowDimensions } from 'src/hooks'
jest.mock('src/hooks')

const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

describe('Header', () => {
  it('should render sign in if user is not logged in', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { getByTestId } = render(getMockHeader({ userLoggedIn: false }))
    const primarySignIn = getByTestId('profile-sign-in-link')
    const secondarySignIn = getByTestId('secondary-profile-sign-in-link')
    expect(primarySignIn).toBeTruthy()
    expect(secondarySignIn).toBeTruthy()
  })

  it('should not render sign in if user is logged in', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    const { queryByTestId } = render(getMockHeader({ userLoggedIn: true }))
    const primarySignIn = queryByTestId('profile-sign-in-link')
    const secondarySignIn = queryByTestId('secondary-profile-sign-in-link')
    expect(primarySignIn).toBeFalsy()
    expect(secondarySignIn).toBeFalsy()
  })
})

function getMockHeader(options: any = undefined) {
  options = Object.assign(
    {
      isLoggedIn: true,
    },
    options,
  )
  return (
    <Header
      smartBanner={0}
      menu={[]}
      secondaryNav={{
        cart: {
          href: 'https//www.frontier.com/signin',
          title: 'Sign In',
        },
        logIn: {
          isLoggedIn: options.userLoggedIn,
          username: 'test ',
        },
        profileNav: {
          href: 'https//www.frontier.com/signin',
          items: [
            {
              href: '/summary',
              title: 'Account Summary',
            },
            {
              href: '/payment',
              title: 'My Payments',
            },
          ],
          title: 'My Account',
        },
        search: {
          href: 'https//www.frontier.com/search',
          title: 'Search',
        },
        signIn: {
          href: 'https//www.frontier.com/signin',
          title: 'Sign In',
        },
      }}
      utilityNav={{
        languageHref: "https//www.frontier.com/espanol'",
        languageTitle: 'Español',
        sites: [
          {
            href: 'https://www.frontier.com/',
            site: 'Residential',
          },
          {
            href: 'https://business.frontier.com/',
            site: 'Small Business',
          },
        ],
      }}
    />
  )
}
