import { UtilityNav } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('UtilityNav', () => {
  it('should render correctly', () => {
    const { getByTestId, getAllByTestId } = render(
      <UtilityNav
        sites={[
          { site: 'site1', href: 'http://site1.link' },
          { site: 'site2', href: 'http://site2.link' },
          { site: 'site3', href: 'http://site3.link' },
        ]}
        languageTitle="Test Title"
        languageHref="testHiperlink"
        showCartLanguageBanner={true}
        cart={{ title: 'test title', href: 'http://cart.link' }}
      />,
    )

    const testAnchor = getByTestId('card-link')
    expect(testAnchor).toHaveAttribute('href', 'http://cart.link')

    const navLinks = getAllByTestId('nav-link')
    for (let i = 0; i < navLinks.length; i++) {
      expect(navLinks[i]).toHaveAttribute('href', `http://site${i + 1}.link`)
    }
  })
})
