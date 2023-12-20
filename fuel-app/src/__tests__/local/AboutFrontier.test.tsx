import AboutFrontier from 'src/libs/local/components/AboutFrontier'
import { render } from '@testing-library/react'

const aboutFrontierData = {
  heading: {
    value: 'About Frontier',
  },
  description: {
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  linkText: {
    value: 'Learn more',
  },
  linkUrl: {
    url: '/shop',
  },
}

describe('AboutFrontier', () => {
  it('should render correctly', () => {
    const { getByText, getByTestId } = render(
      <AboutFrontier data={aboutFrontierData} />,
    )

    expect(getByTestId('AboutFrontier-local')).toBeInTheDocument()
    expect(getByText('About Frontier')).toBeInTheDocument()
    expect(
      getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    ).toBeInTheDocument()
    expect(getByText('Learn more')).toBeInTheDocument()
    expect(getByText('Learn more').closest('a')).toHaveAttribute(
      'href',
      '/shop',
    )
  })

  it('should not render correctly', () => {
    const { queryByText, queryByTestId } = render(<AboutFrontier data={''} />)

    expect(queryByText('About Frontier')).not.toBeInTheDocument()
    expect(queryByTestId('AboutFrontier-local')).toBeNull()
  })
})
