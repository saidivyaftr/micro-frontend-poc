import React from 'react'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import BuildingFiberCopperAvailable from 'src/libs/why-frontier/why-fiber-internet/fiber-expansion/BuildingFiberCopperAvailable'

jest.mock('src/hooks')

const selectedAddress = {
  addressKey: '554afe42-75c2-434e-a6ea-5ab8b84f6381',
  samRecords: [{ controlNumber: '54647', environment: 'LR' }],
}

const buildingFiberMockData = {
  header: {
    value: 'Great news!',
  },
  subheader: {
    value: "Fiber is coming. We're bringing fiber to:",
  },
  editAddress: {
    value: 'Edit address',
  },
  signupText: {
    value: 'Get notified when you can sign up for Frontier Fiber Internet',
  },
  buildingFiberSuccessHeader: {
    value: 'Thank you',
  },
  buildingFiberSuccessSubHeader: {
    value:
      'We will be in touch. In the meantime, check out the other internet service options that are currently available in your area.',
  },
  buildingFiberCopperUnavialableSubHeader: {
    value:
      'Check your inbox or text messages for updates as we plan to bring fiber to your area',
  },
  buildingFiberSuccessButton: {
    link: '/buy',
    text: 'View Plans',
  },
}

describe('BuildingFiberCopperAvailable', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => buildingFiberMockData)
    const { getByText } = render(
      <BuildingFiberCopperAvailable selectedAddress={selectedAddress} />,
    )
    expect(getByText(/Thank you/i)).toBeInTheDocument()
  })
})
