import { SpeedCard } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')
describe('SpeedCard', () => {
  it('should render correctly', () => {
    const { getByTestId, getAllByTestId } = render(
      <SpeedCard
        title="test title"
        backgroundColor="dark-blue"
        titleFontColor="secondary"
        perks={[
          {
            title: 'perk title 1',
            subtitle: 'perk subtitle 1',
            targetItems: [{ name: 'target item 1' }],
          },
          {
            title: 'perk title 2',
            subtitle: 'perk subtitle 2',
            targetItems: [{ name: 'target item 2' }],
          },
        ]}
      />,
    )

    const description = getAllByTestId('test-perk-description')
    const perktitle = getAllByTestId('test-perk-title')

    for (let i = 0; i < perktitle.length; i++) {
      expect(perktitle[i].textContent).toBe('perk title ' + (i + 1))
    }

    for (let i = 0; i < description.length; i++) {
      expect(description[i].textContent).toBe('target item ' + (i + 1))
    }
    const title = getByTestId('test-title')
    expect(title.textContent).toBe('test title')
  })
})
