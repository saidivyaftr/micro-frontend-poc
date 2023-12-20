import { ComparisonTable } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

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
  })
})
