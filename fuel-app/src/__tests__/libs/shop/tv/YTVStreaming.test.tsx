import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { YTVStreaming } from 'src/libs/shop/tv'
jest.mock('src/hooks')
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

describe('YTV Streaming', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      title: {
        value: 'YouTube TV: “Best premium live TV streaming service.”',
      },
      subTitle: {
        value: '- CNET',
      },
      img: {
        src: '/',
        alt: 'LOGO',
      },
    }))
    const { getByTestId, queryByTestId } = render(<YTVStreaming />)
    expect(queryByTestId('YTVStreaming')).toBeInTheDocument()
    expect(getByTestId('title')).toBeInTheDocument()
    expect(getByTestId('img')).toBeInTheDocument()
  })
})
