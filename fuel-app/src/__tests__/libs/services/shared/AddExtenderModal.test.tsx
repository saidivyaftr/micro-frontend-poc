import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from 'src/redux/Store'
import { useAppData } from 'src/hooks'
import AddExtenderModal from 'src/libs/services/shared/AddExtenderModal'

jest.mock('src/hooks')

const additionalExtenderModalContent = {
  modalHeading: {
    value: 'Need more coverage?',
  },
  rangeInfo: {
    value:
      'Each extender can cover up to 1,500 sq. ft. Range varies based on your home’s size, layout and number of floors.',
  },
  priceInfo: {
    value:
      'Whole-Home Wi-Fi includes 2 mesh extenders, but you can add more for $PRICE_PER_MONTH$ each.',
  },
  askCount: {
    value: 'How many mesh extenders?',
  },
  extendersLabel: {
    value: 'Added mesh extenders',
  },
  updateCartCTA: {
    value: 'update cart',
  },
  skipCTA: {
    value: 'Skip',
  },
}

describe('AddExtenderModal', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(
      () => additionalExtenderModalContent,
    )
    render(
      <Provider store={store}>
        <AddExtenderModal
          itemCategory={'123xyz'}
          openExtenderModal={false}
          setOpenExtenderModal={() => false}
          sourceId={'123axy'}
        />
        ,
      </Provider>,
    )
    expect(screen.queryByText(/Need more coverage?/i)).toBe(null)
    expect(
      screen.queryByText(
        /Each extender can cover up to 1,500 sq. ft. Range varies based on your home’s size, layout and number of floors./i,
      ),
    ).toBe(null)
    expect(
      screen.queryByText(
        /Whole-Home Wi-Fi includes 2 mesh extenders, but you can add more for $PRICE_PER_MONTH$ each./i,
      ),
    ).toBe(null)
    expect(screen.queryByText(/How many mesh extenders?/i)).toBe(null)
  })
})
