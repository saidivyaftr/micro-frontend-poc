import { fireEvent, render } from '@testing-library/react'
import SwiperTabs from 'src/libs/fundamental-internet/SwiperTabs'

describe('SwiperTabs', () => {
  it('should render correctly', () => {
    const mockSetSelectedTab = jest.fn()
    const { getByText, getByTestId } = render(
      <SwiperTabs
        tabs={['FIRST', 'SECOND', 'THIRD']}
        selectedTabIndex={0}
        setSelectedTab={mockSetSelectedTab}
      />,
    )
    expect(getByText('FIRST')).toBeInTheDocument()
    expect(getByText('SECOND')).toBeInTheDocument()
    expect(getByText('THIRD')).toBeInTheDocument()
    const lastTab = getByTestId('Swiper-tabs-2')
    fireEvent.click(lastTab)
    expect(mockSetSelectedTab).toHaveBeenCalledWith(2)
  })
})
