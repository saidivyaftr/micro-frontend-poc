import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAppData } from 'src/hooks'
import MyServiceHero from 'src/libs/account/services/MyServiceHero/MyServiceHero'

jest.mock('src/hooks')

const MyServiceHeroMock = {
  title: {
    value: 'My Services',
  },
}

describe('MyServiceHero', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => MyServiceHeroMock)
    const { getByText } = render(
      <MyServiceHero
        title={'My Services'}
        breadcrumb={[]}
        showAccountsDropdown={false}
      />,
    )
    expect(getByText(/My Services/i)).toBeInTheDocument()
  })
})
