import { Accordion } from '@/shared-ui/components'
import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { FiberInternetFAQ } from 'src/libs/shop/internet/fiber-internet/gig'

jest.mock('src/utils/adobe/dynamicTagManagement/client', () => ({
  triggerEvent: jest.fn(),
}))
;(global as any).s_objectID = ''

jest.mock('src/hooks')

const getFAQData = (index: number) => {
  return {
    title: {
      value: `${index} title`,
    },
    description: {
      value: `${index} description`,
    },
  }
}

describe('FiberInternetFAQ', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => ({
      faqItems: {
        faqs: [
          getFAQData(1),
          getFAQData(2),
          getFAQData(3),
          getFAQData(4),
          getFAQData(5),
        ],
      },
      title: {
        value: 'FAQs',
      },
    }))
    const { getByText } = render(<FiberInternetFAQ />)
    expect(getByText('FAQs')).toBeInTheDocument()
    expect(getByText('1 title')).toBeInTheDocument()
    expect(getByText('1 description')).toBeInTheDocument()
  })
  it('Should not display any FiberInternetFAQ where there is no data provided', () => {
    ;(useAppData as any).mockImplementation(() => [])
    const { queryAllByTestId } = render(<FiberInternetFAQ />)
    expect(queryAllByTestId('faqTitle').length).toBe(0)
  })
})

describe('Accordion', () => {
  it('should render correctly', () => {
    const accordionClickHandler = jest.fn()
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
        accordionClickHandler={accordionClickHandler}
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
