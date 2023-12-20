import { SwiperContentWithArrow } from 'src/libs/shop/internet/fiber-internet/2-gig'
import { fireEvent, render } from '@testing-library/react'
import { useAppData, useWindowDimensions } from 'src/hooks'

jest.mock('src/hooks')

const dimensionsData = {
  width: 1025,
  height: 1025,
  visualViewportWidth: 0,
}

describe('SwiperContentWithArrow', () => {
  ;(useWindowDimensions as any).mockImplementation(() => dimensionsData)
  it('should render correctly', () => {
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
          },
          {
            title: {
              value: 'SECOND',
            },
            subTitle: {
              value: 'SECOND SUBTITLE',
            },
          },
          {
            title: {
              value: 'THIRD',
            },
            subTitle: {
              value: 'THIRD SUBTITLE',
            },
          },
        ],
      },
    }))
    const { getByText, getByTestId, getAllByTestId } = render(
      <SwiperContentWithArrow />,
    )
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
