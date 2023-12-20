import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import store from 'src/redux/Store'
import { Provider } from 'react-redux'

import CheckAvailability from 'src/libs/why-frontier/why-fiber-internet/fiber-expansion/CheckAvailability'
jest.mock('src/hooks')

const checkAvailabilityData = {
  scenario: 'PAL_NEEDED',
  selectedAddress: {
    addressKey: '554afe42-75c2-434e-a6ea-5ab8b84f6381',
    samRecords: [{ controlNumber: '54647', environment: 'LR' }],
  },
  node: null,
  nodeOffset: 1000,
  serviceType: 'UNDETERMINABLE',
  status: 'PAL_NEEDED',
}

describe('CheckAvailability', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => checkAvailabilityData)
    render(
      <Provider store={store}>
        <CheckAvailability
          isSectionFixed={true}
          handleScrollToSection={() => ''}
        />
      </Provider>,
    )
  })
})
