import GigServiceCard from 'src/libs/local/components/GigServiceCard'
import { render } from '@testing-library/react'

const MOCK_DATA = {
  title: 'Gig Service Blazing fast fiber',
  description: 'Example of description',
  legalNote: 'Example of legal note',
  perks: [
    {
      title: { value: '1 Example of perk Title' },
    },
    {
      title: { value: '2 Example of perk Title' },
    },
  ],
  key: 1,
}

describe('GigServiceCard', () => {
  it('should render correctly', () => {
    const { getByTestId, getAllByTestId, getByText } = render(
      <GigServiceCard data={MOCK_DATA} />,
    )

    expect(getByText(MOCK_DATA.title)).toBeInTheDocument()
    expect(getByText(MOCK_DATA.description)).toBeInTheDocument()
    expect(getByText(MOCK_DATA.legalNote)).toBeInTheDocument()
    const cards = getByTestId('cards')
    expect(cards).toBeTruthy()
    expect(getAllByTestId('perks').length).toBe(2)
  })

  it('should not render correctly', () => {
    const { queryByText, queryAllByTestId } = render(
      <GigServiceCard data={''} />,
    )

    expect(queryByText(MOCK_DATA.title)).not.toBeInTheDocument()
    expect(queryByText(MOCK_DATA.description)).not.toBeInTheDocument()
    expect(queryByText(MOCK_DATA.legalNote)).not.toBeInTheDocument()
    expect(queryAllByTestId('cards').length).toBe(0)
    expect(queryAllByTestId('perks').length).toBe(0)
  })
})
