import { Accordion } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('Accordion', () => {
  it('should render correctly', () => {
    const { getAllByTestId } = render(
      <Accordion
        list={[
          {
            description: 'test list description 1',
            title: 'test list title 1',
          },
          {
            description: 'test list description 2',
            title: 'test list title 2',
          },
        ]}
      />,
    )
    const title = getAllByTestId('test-title')
    const description = getAllByTestId('test-description')
    for (let i = 0; i < description.length; i++) {
      expect(title[i].textContent).toBe('test list title ' + (i + 1))
      expect(description[i].textContent).toBe(
        'test list description ' + (i + 1),
      )
    }
  })
})
