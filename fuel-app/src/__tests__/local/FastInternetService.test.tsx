import FastInternetService from 'src/libs/local/components/FastInternetService'
import { render } from '@testing-library/react'

const fastInternetServiceData = {
  heading: { value: 'Fast internet service in Los Angeles, California' },
  copy: {
    value: `Los Angeles is California’s largest city. What do all those residents have in common? The need to connect to the world with high-speed internet. Learn more about why Frontier could be the right internet provider for you in Los Angeles.`,
  },
  imageMobile: 'https://via.placeholder.com/345x345',
  imageTablet: 'https://via.placeholder.com/640x400',
  altText: { value: 'Woman playing video games' },
  legalText: '',
  toolTipContent: '',
}

describe('FastInternetService', () => {
  it('should render correctly', () => {
    const { getByText, getByTestId } = render(
      <FastInternetService data={fastInternetServiceData} />,
    )
    expect(getByText(fastInternetServiceData.heading.value)).toBeInTheDocument()
    expect(getByText(fastInternetServiceData.copy.value)).toBeInTheDocument()
    expect(getByTestId('card-and-image-background')).toHaveAttribute(
      'aria-label',
      fastInternetServiceData.altText.value,
    )
    expect(getByTestId('card-and-image-background')).toHaveStyle(
      `background-image: var(--bg-tablet)`,
    )
    expect(getByTestId('card-and-image-background')).toHaveStyle(
      `background-image: var(--bg-mobile)`,
    )
  })

  it('should not render when `data` is undefined', () => {
    const { queryByText } = render(<FastInternetService data={{}} />)
    expect(
      queryByText(fastInternetServiceData.heading.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(fastInternetServiceData.copy.value),
    ).not.toBeInTheDocument()
  })

  it('should not render when `data` is undefined', () => {
    const { queryByText } = render(<FastInternetService data={undefined} />)
    expect(
      queryByText(fastInternetServiceData.heading.value),
    ).not.toBeInTheDocument()
    expect(
      queryByText(fastInternetServiceData.copy.value),
    ).not.toBeInTheDocument()
  })
})
