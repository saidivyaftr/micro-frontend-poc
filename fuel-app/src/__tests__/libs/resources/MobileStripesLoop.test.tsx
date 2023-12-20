import { render } from '@testing-library/react'
import MobileStripesLoop from 'src/libs/resources/MobileStripesLoop'
const mockData = {
  title: {
    value: 'Example 1',
  },
  subTitle: {
    value: 'Example SubTitle 1',
  },
  list: {
    targetItems: [
      {
        imagePosition: {
          position: {
            field: {
              value: 'right',
            },
          },
        },
        title: {
          value: 'Item value',
        },
        description: {
          value: 'Example here title',
        },
        button: {
          btnText: 'Submit',
          btnURL: '/buy',
        },
        backgroundColor: {
          color: {
            field: {
              value: 'green',
            },
          },
        },
        image: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-upgrade-Page/Internet-customers.png?rev=146701e0b1ee4ffe8039cbc22146dc81',
        },
        stripesColor: {
          color: {
            field: {
              value: 'green',
            },
          },
        },
      },
    ],
  },
}
describe('MobileStripesLoop', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<MobileStripesLoop data={mockData} />)
    expect(getByTestId('MobileStripesLoopData-info')).toBeVisible()
  })
  it('should render correctly with Title', () => {
    const { getByTestId, getByText } = render(
      <MobileStripesLoop data={mockData} />,
    )
    expect(getByTestId('MobileStripesLoopData-info')).toBeVisible()
    expect(getByText('Example 1')).toBeInTheDocument()
  })
})
