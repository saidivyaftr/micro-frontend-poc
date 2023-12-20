import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import store from 'src/redux/Store'
import { Provider } from 'react-redux'
import EmptyCartModal from 'src/libs/services/shared/EmptyCartModal'

jest.mock('src/hooks')

const handleCloseModal = jest.fn()

const emptyCartModalContent = {
  modalHeading: {
    value: 'Your cart',
  },
  info: {
    value: 'Your cart is empty.',
  },
  closeCta: {
    value: 'Close',
  },
}

describe('EmptyCartModal', () => {
  it('should render correctly', async () => {
    ;(useAppData as any).mockImplementation(() => emptyCartModalContent)
    render(
      <Provider store={store}>
        <EmptyCartModal
          handleCloseModal={() => handleCloseModal}
          showEmptyCartModal={true}
        />
        ,
      </Provider>,
    )
  })
})
