import TopBar from 'src/components/NewHeader'
import { mountWithMock } from 'src/__utils__'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  // eslint-disable-next-line
  useRouter: () => ({ pathname: '/' }),
}))

describe('TopBar', () => {
  const mockHeader = {
    header: {
      logoname: '/images/logo.png',
      name: 'Frontier',
      logonamepath: '/',
      navs: [
        {
          name: 'Sign In',
          path: 'https://frontier.com/login',
        },
      ],
      phonenumber: '1.855.332.9724',
    },
  }
  it('Should render correctly', () => {
    const wrapper = mountWithMock(
      TopBar,
      {
        common: mockHeader,
      },
      {},
    )
    expect(wrapper.html()).toBeTruthy()
    expect(wrapper.find('a').length).toBe(3)
  })
})
