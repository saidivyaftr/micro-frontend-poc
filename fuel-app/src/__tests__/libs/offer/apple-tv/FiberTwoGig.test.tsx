import { FiberTwoGig } from 'src/libs/offer/apple-tv'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'TITLE',
  },
  subTitle: {
    value: 'SUB TITLE',
  },
  benefits: {
    list: [
      {
        text: {
          value: 'LIST ONE',
        },
      },
    ],
  },
  image: {
    src: '',
  },
  legalText: {
    value: '',
  },
  buttonLink: {
    url: '#',
  },
  buttonText: {
    value: 'BUTTON NAME',
  },
}

describe('FiberTwoGig', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText } = render(<FiberTwoGig />)
    expect(getByText('TITLE')).toBeInTheDocument()
    expect(getByText('SUB TITLE')).toBeInTheDocument()
    expect(getByText('LIST ONE')).toBeInTheDocument()
    expect(getByText('BUTTON NAME')).toBeInTheDocument()
  })
})
