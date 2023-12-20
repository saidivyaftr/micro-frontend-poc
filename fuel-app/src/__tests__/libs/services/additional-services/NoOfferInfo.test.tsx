import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import NoOfferInfo from 'src/libs/services/additional-services/NoOfferInfo'
import { useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')

const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

const appData = {
  noOffersInfo: {
    value:
      'Unfortunately, you are not eligible for additional services at this time',
  },
  goToMyAccountCta: {
    value: 'Go to My account',
  },
  accountSummaryLink: {
    value: 'account#/summary',
  },
}

describe('NoOfferInfo', () => {
  it('should render correctly', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useAppData as any).mockImplementation(() => appData)
    const { getByText, container } = render(<NoOfferInfo />)
    expect(
      getByText(
        'Unfortunately, you are not eligible for additional services at this time',
      ),
    ).toBeInTheDocument()
    expect(getByText('Go to My account')).toBeInTheDocument()
    expect(container.querySelector('a')?.href).toEqual(
      'http://localhost/account#/summary',
    )
  })
})
