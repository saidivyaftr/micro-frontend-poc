import { render } from '@testing-library/react'
import SpeedCallOut from 'src/libs/resources/SpeedCallout'
const mockData = {
  title: {
    value: 'test title',
  },
  backgroundColor: {
    value: 'dark-blue',
  },
  titleFontColor: {
    value: 'secondary',
  },
  perks: {
    list: [
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
    ],
  },
}
describe('SpeedCallOut', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<SpeedCallOut data={mockData} />)
    expect(getByTestId('speedCallOut-info')).toBeVisible()
  })
})
