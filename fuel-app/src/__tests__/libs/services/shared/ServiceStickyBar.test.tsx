import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAppData } from 'src/hooks'
import ServiceStickyBar from 'src/libs/services/shared/ServiceStickyBar'

jest.mock('src/hooks')

const cartStickyBarContent = {
  AddToCartLink: {
    value: '',
  },
  AddToCartText: {
    value: 'Add To Cart',
  },
  GoToCartText: {
    value: 'Go To Cart',
  },
  addedToCart: {
    value: 'Added to cart',
  },
  productPrice: {
    value: '$5/mo.',
  },
  subField: {
    value: 'for x months then $X/mo.',
  },
  title: {
    value: 'My Premium Tech Pro',
  },
}

const pdpOfferData: offerData = {
  ItemCode: 'RNPTP',
  Action: 'Add',
  FeatureGroup: 'PREMIUM TECHNICAL SUPPORT',
  Description: 'My Premium Tech Pro',
  ItemSequence: 0,
  IsDisabled: false,
  MaximumQuantity: 1,
  FeatureClass: 'FRONTIER SECURE',
  AdditionalText: '',
  Type: 'New',
  Recurring: true,
  Price: 10,
}

describe('ServiceHero', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => cartStickyBarContent)
    const { getByText } = render(
      <ServiceStickyBar
        cartStickyBarContent={cartStickyBarContent}
        showAddCartButton={false}
        showButtonLoading={false}
        pdpOfferData={pdpOfferData}
      />,
    )
    expect(getByText(/My Premium Tech Pro/i)).toBeInTheDocument()
    expect(getByText(/Add to cart/i)).toBeInTheDocument()
    expect(getByText(/\$5\/mo./i)).toBeInTheDocument()
    expect(getByText(/for x months then \$X\/mo./i)).toBeInTheDocument()
  })
})
