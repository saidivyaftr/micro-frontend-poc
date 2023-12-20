import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { GetInternet } from 'src/libs/offer/affordable-broadband'

jest.mock('src/hooks')
const mockData = {
  componentName: 'getInternet',
  title: {
    value: 'Get internet and voice in one low-cost bundle',
  },
  subTitle: {
    value:
      'Frontier Affordable Broadband must be bundled with California LifeLine landline service. Below is an example of what your bill would total if you were to choose either the Flat Rate bundle or the Measured Rate bundle.',
  },
  list: {
    targetItems: [
      {
        title: {
          value: 'Flat Rate bundle',
        },
        cardInfo: {
          targetItems: [
            {
              title: {
                value: 'Lifeline Flat rate*',
              },
              amount: {
                value: '$6.84 ',
              },
            },
            {
              title: {
                value: 'Affordable Broadband',
              },
              amount: {
                value: '$13.99',
              },
            },
            {
              title: {
                value: 'Your total price per month*',
              },
              amount: {
                value: '$20.83',
              },
            },
          ],
        },
      },
      {
        title: {
          value: 'Measured Rate bundle',
        },
        cardInfo: {
          targetItems: [
            {
              title: {
                value: 'Lifeline Flat rate*',
              },
              amount: {
                value: '$3.66 ',
              },
            },
            {
              title: {
                value: 'Affordable Broadband',
              },
              amount: {
                value: '$13.99',
              },
            },
            {
              title: {
                value: 'Your total price per month*',
              },
              amount: {
                value: '$17.65',
              },
            },
          ],
        },
      },
    ],
  },
}
describe('GetInternet', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId } = render(<GetInternet />)
    expect(getByTestId('getInternet-title')).toBeInTheDocument()
    expect(getByTestId('getInternet-title').textContent).toBe(
      mockData.title.value,
    )
    expect(getByTestId('getInternet-subTitle').textContent).toBe(
      mockData.subTitle.value,
    )
  })
  it('should render correctly with cards', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getAllByTestId } = render(<GetInternet />)
    const title = getAllByTestId('getInternet-card-title')
    for (let i = 0; i < title.length; i++) {
      expect(title[i].textContent).toBe(
        mockData.list.targetItems[i].title.value,
      )
    }
  })

  it('should not render correctly with cards', () => {
    const withoutMockdata = {
      ...mockData,
      list: {},
    }
    ;(useAppData as any).mockImplementation(() => withoutMockdata)
    const { queryByTestId } = render(<GetInternet />)
    expect(queryByTestId('getInternet-title')).not.toBeInTheDocument()
  })
})
