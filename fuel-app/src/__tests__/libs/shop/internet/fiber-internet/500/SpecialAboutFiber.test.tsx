import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import SpecialAboutFiber from 'src/libs/shop/internet/fiber-internet/500/SpecialAboutFiber'

jest.mock('src/hooks')

const mockData = {
  title: {
    value: 'Why choose Fiber 500 Internet?',
  },
  subTitle: {
    value: 'text subTitle',
  },
  legalDisclaimer: {
    value: 'text legalDisclaimer',
  },
  list: {
    targetItems: [
      {
        title: {
          value: 'title 1',
        },
        description: {
          value: 'description 1',
        },
      },
      {
        title: {
          value: 'title 2',
        },
        description: {
          value: 'description 2',
        },
      },
      {
        title: {
          value: 'title 3',
        },
        description: {
          value: 'description 3',
        },
      },
    ],
  },
}

describe('SpecialAboutFiber', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId, getByText } = render(<SpecialAboutFiber />)
    expect(getByTestId('special-about-fiber')).toBeInTheDocument()
    expect(getByText(mockData.title.value)).toBeInTheDocument()
    expect(getByText(mockData.subTitle.value)).toBeInTheDocument()
    expect(getByText(mockData.legalDisclaimer.value)).toBeInTheDocument()
    for (let i = 0; i < mockData.list.targetItems.length; i++) {
      expect(
        getByText(mockData.list.targetItems[i].title.value),
      ).toBeInTheDocument()
      expect(
        getByText(mockData.list.targetItems[i].description.value),
      ).toBeInTheDocument()
    }
  })
})
