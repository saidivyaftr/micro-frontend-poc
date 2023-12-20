import { FourTiles } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('FourTiles', () => {
  it('should render correctly', () => {
    const { getAllByTestId } = render(
      <FourTiles
        type="light"
        textAlign="left"
        tiles={[
          {
            description: 'test description 1',
            href: 'test href 1',
            icon: <div />,
            title: 'test title 1',
          },
          {
            description: 'test description 2',
            href: 'test href 2',
            icon: <div />,
            title: 'test title 2',
          },
        ]}
      />,
    )

    const description = getAllByTestId('test-description')
    const title = getAllByTestId('test-title')

    for (let i = 0; i < title.length; i++) {
      expect(title[i].textContent).toBe('test title ' + (i + 1))
    }

    for (let j = 0; j < description.length; j++) {
      expect(description[j].textContent).toBe('test description ' + (j + 1))
    }
  })
})
