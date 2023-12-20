import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAppData } from 'src/hooks'
import ExpertSupport from 'src/libs/services/shared/ExpertSupport'

jest.mock('src/hooks')

const cartStickyBarContent = {
  productExplanationHeadline: {
    value: 'Expert tech support for your connected life',
  },
  productExplanationSubCopy: {
    value:
      'Our team of U.S.-based tech experts are ready to help you install, use and troubleshoot all your devices, technology and online services. Multi-device security. Identity Protection. Password Management.',
  },
}

describe('ExpertSupport', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => cartStickyBarContent)
    const { getByText } = render(
      <ExpertSupport cartStickyBarContent={cartStickyBarContent} />,
    )
    expect(
      getByText(/Expert tech support for your connected life/i),
    ).toBeInTheDocument()
    expect(
      getByText(
        /Our team of U.S.-based tech experts are ready to help you install, use and troubleshoot all your devices, technology and online services. Multi-device security. Identity Protection. Password Management./i,
      ),
    ).toBeInTheDocument()
  })
})
