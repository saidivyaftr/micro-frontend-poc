import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAppData } from 'src/hooks'
import { offerData } from 'src/libs/services/shared/types'
import ServicesHero from 'src/libs/services/shared/selfServiceHeader/ServicesHero'

jest.mock('src/hooks')

const cartStickyBarContent = {
  AddToCartLink: {
    value: '',
  },
  AddToCartText: {
    value: 'Add To Cart',
  },
  FillCartTitle: {
    value: 'Added to your cart. Start using this product today',
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
      <ServicesHero
        cartStickyBarContent={cartStickyBarContent}
        showAddCartButton={true}
        showButtonLoading={false}
        pdpOfferData={pdpOfferData}
      />,
    )
    expect(getByText(/My Premium Tech Pro/i)).toBeInTheDocument()
    expect(getByText(/Add to cart/i)).toBeInTheDocument()
    expect(getByText(/\$10\/mo./i)).toBeInTheDocument()
  })

  it('should invoke onClick event if user clicks on the button', () => {
    const { getByText } = render(
      <ServicesHero
        cartStickyBarContent={cartStickyBarContent}
        showAddCartButton={true}
        showButtonLoading={false}
        pdpOfferData={pdpOfferData}
      />,
    )
    const button = getByText('Add To Cart')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
  })

  it('should show GoTo Cart Button', () => {
    const { getByText } = render(
      <ServicesHero
        cartStickyBarContent={cartStickyBarContent}
        showAddCartButton={false}
        showButtonLoading={false}
        pdpOfferData={pdpOfferData}
      />,
    )
    const button = getByText('Go To Cart')
    expect(button).toBeInTheDocument()
  })
})
