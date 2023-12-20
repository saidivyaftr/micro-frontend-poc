import FastestInternet from 'src/libs/local/components/FastestInternet'
import { render } from '@testing-library/react'

const fastestInternetData = {
  hide: { value: false },
  image: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/local/ookla-fastest.png?rev=2eb5ee641ee24276af4830a3b62cfad6',
    alt: 'Ookla Fastest Internet',
  },
  description: {
    value: 'Description',
  },
  title: {
    value: 'Fastest internet in Los Angeles',
  },
  toolTipText: {
    value: '',
  },
}

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    asPath: '',
  }),
}))

describe('fastest-internet', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <FastestInternet data={fastestInternetData} />,
    )
    const fastestInternetOp = getByTestId('fastest-internet')
    expect(fastestInternetOp).toBeTruthy()
    expect(getByText(fastestInternetData.title.value)).toBeInTheDocument()
    const description = getByTestId('caption')
    expect(description).toBeTruthy()
    expect(description).toBeVisible()
    expect(description).toHaveTextContent('Description')
  })

  it('should not render when `data` is an empty object', () => {
    const { queryByTestId, queryByText } = render(<FastestInternet data={{}} />)

    expect(queryByText(fastestInternetData.title.value)).not.toBeInTheDocument()
    expect(queryByTestId('fastest-internet')).not.toBeInTheDocument()
    expect(queryByTestId('caption')).not.toBeInTheDocument()
  })

  it('should not render when `data` is undefined', () => {
    const { queryByTestId, queryByText } = render(
      <FastestInternet data={undefined} />,
    )
    expect(queryByTestId('fastest-internet')).not.toBeInTheDocument()
    expect(queryByTestId('caption')).not.toBeInTheDocument()
    expect(queryByText(fastestInternetData.title.value)).not.toBeInTheDocument()
  })
})
