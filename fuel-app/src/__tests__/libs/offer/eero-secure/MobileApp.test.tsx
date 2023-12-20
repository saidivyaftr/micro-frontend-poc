import { MobileApp } from 'src/libs/offer/eero-secure'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Mobile App title',
  },
  subTitle: {
    value: 'Mobile App sub-title',
  },
  list: {
    targetItems: [
      {
        title: {
          value: 'Mobile app item 1 title',
        },
        description: {
          value: 'Mobile app item 1 description',
        },
        image: {
          src: '',
          alt: 'Mobile app item 1 image',
        },
      },
      {
        title: {
          value: 'Mobile app item 2 title',
        },
        description: {
          value: 'Mobile app item 2 description',
        },
        image: {
          src: '',
          alt: 'Mobile app item 2 image',
        },
      },
    ],
  },
}

describe('MobileApp', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, getByAltText, getAllByTestId } = render(<MobileApp />)
    const firstMobileApp = getAllByTestId('mobileApp')[0]
    expect(
      firstMobileApp.querySelector('[data-testid=mobileApp-title]')?.innerHTML,
    ).toBe('Mobile App title')
    expect(
      firstMobileApp.querySelector('[data-testid=mobileApp-subTitle]')
        ?.innerHTML,
    ).toBe('Mobile App sub-title')
    expect(getByText('Mobile app item 1 title')).toBeInTheDocument()
    expect(getByText('Mobile app item 1 description')).toBeInTheDocument()
    expect(getByAltText('Mobile app item 1 image')).toBeInTheDocument()
    expect(getByText('Mobile app item 2 title')).toBeInTheDocument()
    expect(getByText('Mobile app item 2 description')).toBeInTheDocument()
    expect(getByAltText('Mobile app item 2 image')).toBeInTheDocument()
  })

  it('should not render list items', () => {
    ;(useAppData as any).mockImplementation(() => {
      return { ...mockData, list: [] }
    })
    const { getByText, queryByText, getAllByTestId } = render(<MobileApp />)
    const firstMobileApp = getAllByTestId('mobileApp')[0]
    expect(getByText('Mobile App title')).toBeInTheDocument()
    expect(getByText('Mobile App sub-title')).toBeInTheDocument()
    expect(
      firstMobileApp.querySelector('[data-testid=mobileApp-listItem]'),
    ).toBeNull()
    expect(queryByText('Mobile app item 1 title')).not.toBeInTheDocument()
    expect(queryByText('Mobile app item 2 title')).not.toBeInTheDocument()
  })

  it('should not render without data', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {}
    })
    const { queryByTestId } = render(<MobileApp />)
    const firstMobileApp = queryByTestId('mobileApp')
    expect(firstMobileApp).not.toBeInTheDocument()
  })
})
