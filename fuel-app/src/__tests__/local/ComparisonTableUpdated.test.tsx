import ComparisonTableUpdated from 'src/libs/local/components/ComparisonTableUpdated'
import { render, cleanup } from '@testing-library/react'

const MOCK_DATA = {
  title: {
    value: 'Comparison Table',
  },
  yesIcon: {
    value:
      'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/shop/tv/check-mark-black.svg?rev=3361ced0fcec470ab7f821ebd997e697',
    alt: 'checkmark',
  },
  legal: {
    value: '',
  },
  buttonText: {
    value: '',
  },
  buttonURL: {
    url: '',
  },
  items: {
    list: [
      {
        headerDescription: {
          value: 'Header 1',
        },
        logo: {
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/fiber-2-gigabit-internet/logo-frontier.png?rev=78dfde7215fe416d80e38143dcebfa57',
        },
        iconColor: {
          color: {
            field: {
              value: '#ff0037',
            },
          },
        },
        properties: {
          list: [
            {
              name: {
                value: 'Speed',
              },
              toolTip: {
                value: 'Tooltip 1',
              },
              textValue: {
                value:
                  '<div> <span>2000 </span> Mbps download <br />\n<span>2000</span> Mbps upload</div>',
              },
              value: {
                value: false,
              },
              isPrimary: {
                value: false,
              },
            },
          ],
        },
      },
    ],
  },
}

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
  }),
}))

describe('comparison table', () => {
  afterEach(cleanup)
  it('should render correctly', () => {
    const { asFragment, getByText } = render(
      <ComparisonTableUpdated data={MOCK_DATA} />,
    )
    expect(asFragment()).toMatchSnapshot()
    expect(getByText(MOCK_DATA.title.value)).toBeInTheDocument()
    expect(
      getByText(MOCK_DATA.items.list[0].properties.list[0].name.value),
    ).toBeInTheDocument()
  })

  it('should not render correctly', () => {
    const { queryByText } = render(<ComparisonTableUpdated data={''} />)
    expect(queryByText(MOCK_DATA.title.value)).not.toBeInTheDocument()
    expect(
      queryByText(MOCK_DATA.items.list[0].properties.list[0].name.value),
    ).not.toBeInTheDocument()
  })
})
