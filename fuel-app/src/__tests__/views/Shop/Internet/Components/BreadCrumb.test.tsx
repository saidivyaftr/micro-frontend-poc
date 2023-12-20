import BreadCrumb from 'src/libs/shop/components/BreadCrumb'
import { mountWithMock } from 'src/__utils__'

describe('Bread Crumb', () => {
  it('should render correctly without store', () => {
    const component = mountWithMock(BreadCrumb)
    expect(component).toMatchSnapshot()
  })
  it('should render breadcrumb correctly with store', () => {
    const mockData = {
      breadCrumbs: {
        parentName: {
          value: 'Frontier® Fiber Internet',
        },
        parentPath: {
          url: '/shop/internet/fiber-optic-internet',
        },
        name: {
          value: 'Frontier® Fiber Internet Gig Service',
        },
      },
    }
    const wrapper = mountWithMock(BreadCrumb, {
      appData: mockData,
    })
    expect(wrapper).toMatchSnapshot()
  })
})
