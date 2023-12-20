import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { ShowTimeOrder } from 'src/libs/shop/tv/channels/showtime'

jest.mock('src/hooks')

const mock = {
  title: { value: 'title' },
  content: { value: 'content' },
  image: { src: 'https://placehold.co/400' },
}

describe('Order', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mock)

    const { getByText, queryByTestId } = render(<ShowTimeOrder />)
    expect(queryByTestId('how-to-order')).toBeInTheDocument()
    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('content')).toBeInTheDocument()
    expect(queryByTestId('cardImage')).toBeInTheDocument()
  })

  it('should not render without title', () => {
    ;(useAppData as any).mockImplementation(() => {
      return { title: { value: '' } }
    })
    const { queryByTestId } = render(<ShowTimeOrder />)
    expect(queryByTestId('how-to-order')).not.toBeInTheDocument()
  })
})
