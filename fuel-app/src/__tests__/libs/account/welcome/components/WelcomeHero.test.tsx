import WelcomeHero from 'src/libs/account/welcome/components/WelcomeHero'
import { render } from '@testing-library/react'
import * as redux from 'react-redux'

jest.mock('src/hooks')

const mockData = {
  title: 'Welcome',
  subTitle: 'Hello User Welcome',
}
const profileData = {
  firstName: 'Mr. David',
}
const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue(profileData)

describe('WelcomeHero', () => {
  it('should render correctly', () => {
    const { getByText } = render(<WelcomeHero {...mockData} />)
    expect(getByText(mockData.title)).toBeInTheDocument()
    expect(getByText(mockData.subTitle)).toBeInTheDocument()
    expect(getByText(profileData.firstName)).toBeInTheDocument()
  })
})

describe('WelcomeHero', () => {
  it('should not render correctly', () => {
    const { asFragment } = render(<WelcomeHero />)
    expect(asFragment()).toMatchSnapshot()
  })
})
