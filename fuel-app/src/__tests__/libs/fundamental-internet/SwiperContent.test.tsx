import { fireEvent, render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { useWindowDimensions } from 'src/hooks'
import { SwiperContent } from 'src/libs/fundamental-internet'
const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}
jest.mock('src/hooks')
describe('SwiperContent', () => {
  it('should render correctly', () => {
    ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
    ;(useAppData as any).mockImplementation(() => ({
      list: {
        targetItems: [
          {
            title: {
              value: 'FIRST',
            },
            subTitle: {
              value: 'FIRST SUBTITLE',
            },
            slideToggle: {
              value: false,
            },
          },
          {
            title: {
              value: 'SECOND',
            },
            subTitle: {
              value: 'SECOND SUBTITLE',
            },
            slideToggle: {
              value: true,
            },
          },
          {
            title: {
              value: 'THIRD',
            },
            subTitle: {
              value: 'THIRD SUBTITLE',
            },
            slideToggle: {
              value: false,
            },
          },
        ],
      },
    }))
    const { getByText, getByTestId, getAllByTestId } = render(<SwiperContent />)
    expect(getByText('FIRST')).toBeInTheDocument()
    expect(getByText('SECOND')).toBeInTheDocument()
    expect(getByText('THIRD')).toBeInTheDocument()
    const lastTab = getByTestId('Swiper-tabs-2')
    fireEvent.click(lastTab)
    expect(getAllByTestId('subTitle-2')[0].innerHTML).toContain(
      'THIRD SUBTITLE',
    )
  })
})
