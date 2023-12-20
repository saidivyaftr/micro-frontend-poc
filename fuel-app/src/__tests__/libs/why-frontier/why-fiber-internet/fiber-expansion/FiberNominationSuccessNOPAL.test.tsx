import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import store from 'src/redux/Store'
import { Provider } from 'react-redux'
import FiberNominationSuccessNOPAL from 'src/libs/why-frontier/why-fiber-internet/fiber-expansion/FiberNominationSuccessNOPAL'
jest.mock('src/hooks')

const fiberNominationSuccessNOPALData = {
  scenario: 'PAL_NEEDED',
  selectedAddress: {
    addressKey: '554afe42-75c2-434e-a6ea-5ab8b84f6381',
    samRecords: [{ controlNumber: '54647', environment: 'LR' }],
  },
  node: null,
  nodeOffset: 1000,
}

describe('FiberNominationSuccessNOPAL', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(
      () => fiberNominationSuccessNOPALData,
    )
    render(
      <Provider store={store}>
        <FiberNominationSuccessNOPAL />
      </Provider>,
    )
  })
})
