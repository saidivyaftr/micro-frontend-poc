import { render } from '@testing-library/react'
import { BreadcrumbNav } from 'src/libs/resources'

const mockData = {
  path: {
    targetItems: [
      {
        pageName: {
          value: 'Home',
        },
        href: {
          url: '/',
        },
      },
      {
        pageName: {
          value: 'Shop',
        },
        href: {
          url: '/shop',
        },
      },
      {
        pageName: {
          value: 'Internet',
        },
        href: {
          url: '/shop/internet',
        },
      },
    ],
  },
}
describe('Bread Crumb', () => {
  it('should render correctly', () => {
    const { getByText, getByTestId } = render(<BreadcrumbNav data={mockData} />)
    expect(getByText('Internet')).toBeInTheDocument()
    expect(getByTestId('Breadcrumb-nav')).toBeVisible()
  })
  it('should not render  correctly', () => {
    const { queryByTestId, queryByText } = render(<BreadcrumbNav data={''} />)
    expect(queryByText('Internet')).not.toBeInTheDocument()
    expect(queryByTestId('Breadcrumb-nav')).not.toBeInTheDocument()
  })
})
