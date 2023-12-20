import TechnicalErrorCard from 'src/libs/account/welcome/components/TechnicalErrorCard'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
jest.mock('src/hooks')

const technicalErrorCard = {
  title: {
    value: 'Technical Error',
  },
  warning: {
    value: 'Error Warning',
  },
  message: {
    value: 'Technical Error Message ',
  },
}
describe('TechnicalErrorCard', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => technicalErrorCard)
    const { getByText } = render(<TechnicalErrorCard />)
    expect(getByText(technicalErrorCard.title.value)).toBeInTheDocument()
    expect(getByText(technicalErrorCard.warning.value)).toBeInTheDocument()
  })
})

describe('TechnicalErrorCard', () => {
  it('should not render correctly', () => {
    const { asFragment } = render(<TechnicalErrorCard />)
    expect(asFragment()).toMatchSnapshot()
  })
})
