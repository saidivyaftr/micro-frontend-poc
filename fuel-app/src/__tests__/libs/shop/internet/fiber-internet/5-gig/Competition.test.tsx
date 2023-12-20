import { ComparisonTable } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { render } from '@testing-library/react'
import { Competition } from 'src/libs/shop/internet/fiber-internet/5-gig'
jest.mock('src/hooks')

const mockData = {
  title: {
    value: 'Example1',
  },
}
describe('Competition', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByTestId, queryByTestId } = render(<Competition />)
    expect(getByTestId('title')).toBeInTheDocument()
    expect(queryByTestId('Competition')).toBeInTheDocument()
  })
})

describe('Competition', () => {
  it('should not render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      title: {
        value: '',
      },
    }))
    const { queryByTestId } = render(<Competition />)
    expect(queryByTestId('Competition')).toBeInTheDocument()
  })
})

describe('ComparisonTable', () => {
  it('should render correctly', () => {
    const { getByTestId, getAllByTestId } = render(
      <ComparisonTable
        items={[
          {
            headerDescription: 'test headerDescription',
            headerDescriptionLink: 'test headerDescriptionLink',
            logo: 'test logo',
            properties: [
              {
                name: 'test name property 1',
                textValue: 'test textValue property 1',
                value: false,
              },
              {
                name: 'test name property 2',
                textValue: 'test textValue property 2',
                value: false,
              },
            ],
          },
        ]}
      />,
    )
    const headerDescription = getByTestId('test-headerDescription')
    const logo = getByTestId('test-logo')

    const name = getAllByTestId('test-name')
    const textValue = getAllByTestId('test-textValue')
    for (let i = 0; i < textValue.length; i++) {
      expect(name[i].textContent).toBe('test name property ' + (i + 1))
      expect(textValue[i].textContent).toBe(
        'test textValue property ' + (i + 1),
      )
    }
    expect(headerDescription.innerHTML).toBe('test headerDescription')
    expect(headerDescription.getAttribute('href')).toBe(
      'test headerDescriptionLink',
    )
    expect(logo.getAttribute('src')).toBe('test logo')
    expect(logo.getAttribute('src')).toBe('test logo')
  })
})

describe('ComparisonTable', () => {
  it('should render correctly', () => {
    const { queryByTestId } = render(<ComparisonTable items={[]} />)
    expect(queryByTestId('comparision')).not.toBeInTheDocument()
  })
})
