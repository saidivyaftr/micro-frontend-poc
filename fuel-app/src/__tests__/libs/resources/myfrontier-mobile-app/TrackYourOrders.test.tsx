import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { TrackYourOrders } from 'src/libs/resources/myfrontier-mobile-app'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Track your orders',
  },
  description: {
    value: 'Track your orders description',
  },
  stripesColor: {
    Color: {
      field: {
        value: '#ff0037',
      },
    },
  },
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/myfrontier-mobile-app-page/TrackYOurOrders.png?rev=9d8f628fb1f9457a9da27213d6e1bc5f',
    alt: 'Track Your Orders',
  },
  backgroundColor: {
    Color: {
      field: {
        value: '#F3F4F4',
      },
    },
  },
}

describe('TrackYourOrders', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, getByAltText } = render(<TrackYourOrders />)
    expect(getByText('Track your orders')).toBeInTheDocument()
    expect(getByText('Track your orders description')).toBeInTheDocument()
    expect(getByAltText('Track Your Orders')).toBeInTheDocument()
  })

  it('should render correctly without image', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        image: {},
      }
    })
    const { queryByAltText } = render(<TrackYourOrders />)
    expect(queryByAltText('Track Your Orders')).not.toBeInTheDocument()
  })
})
