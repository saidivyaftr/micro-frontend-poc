import { NotificationBanner } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('NotificationBanner', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <NotificationBanner
        notificationBannerText="test notificationBannerText <a href='test href'>test link</a>"
        showBanner={true}
      />,
    )
    const content = getByTestId('test-banner-content')
    expect(content.textContent).toBe('test notificationBannerText test link')
    expect(content.querySelector('a')?.getAttribute('href')).toBe('test href')
  })
})
