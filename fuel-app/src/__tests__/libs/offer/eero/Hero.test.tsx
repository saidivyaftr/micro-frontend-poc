import { render } from '@testing-library/react'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { Hero } from 'src/libs/offer/eero'

jest.mock('src/hooks')
const mockData = {
  firstTitle: {
    value: 'Eero makes',
  },
  secondTitle: {
    value: 'Wi-Fi easy',
  },
  description: {
    value:
      'Get an Amazon eero Wi-Fi 6E system included with Fiber 2 Gig service',
  },
  btnText: {
    value: '',
  },
  btnUrl: {
    url: '/buy',
  },
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/eero-Page/eero-Hero.png?rev=cf61a9adab5c40fa863f2fd24a0eee1f',
    alt: 'Eero Device',
  },
  mobileimage: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/eero-Page/eero-Hero-Mobile.png?rev=af2eb56b59ce448084f9658a46fc0559',
    alt: 'Eero Device',
  },
}

const dimensionsData = {
  width: 1025,
}

describe('Hero', () => {
  ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
  it('should render correctly without button', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, queryByText } = render(<Hero />)
    expect(getByText('Eero makes')).toBeInTheDocument()
    expect(getByText('Wi-Fi easy')).toBeInTheDocument()
    expect(
      getByText(
        'Get an Amazon eero Wi-Fi 6E system included with Fiber 2 Gig service',
      ),
    ).toBeInTheDocument()
    expect(queryByText('CHECK AVAILABILITY')).not.toBeInTheDocument()
  })

  it('should render correctly with button', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        btnText: {
          value: 'CHECK AVAILABILITY',
        },
      }
    })
    const { getByText } = render(<Hero />)
    expect(getByText('CHECK AVAILABILITY')).toBeInTheDocument()
  })
})
