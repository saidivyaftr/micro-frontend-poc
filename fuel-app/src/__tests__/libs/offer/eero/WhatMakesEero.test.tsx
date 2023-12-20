import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { WhatMakesEero } from 'src/libs/offer/eero'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'What makes eero different?',
  },
  tiles: {
    list: [
      {
        title: {
          value: 'Easy set up in minutes',
        },
        description: {
          value:
            'Whether you need a single router or a whole-home system, eero works with your existing internet connection and is ready to set up right out of the box.',
        },
        icon: {
          value:
            '<svg width="43" height="40" viewBox="0 0 43 41" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M18 4.9541H22C26.5032 4.9541 30.5098 7.08021 33.0707 10.3834L20 23.4541L13.5 16.9541L10.5 19.9541L20 29.4541L42.5 6.9541L39.5 3.9541L35.9168 7.53734C32.6156 3.51797 27.6072 0.954102 22 0.954102H18C8.05887 0.954102 0 9.01298 0 18.9541V22.9541C0 32.8952 8.05887 40.9541 18 40.9541H22C31.9411 40.9541 40 32.8952 40 22.9541V18.9541C40 17.8571 39.9019 16.783 39.7139 15.7402L36 19.4541V22.9541C36 30.6861 29.732 36.9541 22 36.9541H18C10.268 36.9541 4 30.6861 4 22.9541V18.9541C4 11.2221 10.268 4.9541 18 4.9541Z" fill="#FF0037"/>\n            </svg>',
        },
      },
      {
        title: {
          value: 'Fast speeds',
        },
        description: {
          value:
            'Every eero is designed with one speed in mind: fast. From video conferencing to streaming and gaming, eero has you covered.',
        },
        icon: {
          value:
            '<svg width="44" height="40" viewBox="0 0 44 37" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M0 20.9541C0 9.90841 8.9543 0.954102 20 0.954102H24C35.0457 0.954102 44 9.90841 44 20.9541V25.9541C44 26.9941 43.8557 28.0004 43.5859 28.9541H39.3264C39.7583 28.0448 40 27.0277 40 25.9541V20.9541C40 12.1175 32.8366 4.9541 24 4.9541H20C11.1634 4.9541 4 12.1175 4 20.9541V25.9541C4 27.0277 4.24169 28.0448 4.67363 28.9541H0.414065C0.144334 28.0004 0 26.9941 0 25.9541V20.9541Z" fill="#FF0037"/>\n            <path d="M2.51432 32.9541C4.53191 35.3971 7.58413 36.9541 11 36.9541H33C36.4159 36.9541 39.4681 35.3971 41.4857 32.9541H2.51432Z" fill="#FF0037"/>\n            <path d="M16.3414 28.9541H27.6586C27.8797 28.3285 28 27.6554 28 26.9541C28 25.3467 27.3679 23.8869 26.3387 22.8098L32.548 15.2207C32.8305 14.8758 33 14.4347 33 13.9541C33 12.8495 32.1046 11.9541 31 11.9541C30.3658 11.9541 29.8006 12.2492 29.4342 12.7097L22.6595 20.9899C22.4429 20.9663 22.2229 20.9541 22 20.9541C18.6863 20.9541 16 23.6404 16 26.9541C16 27.6554 16.1203 28.3285 16.3414 28.9541Z" fill="#FF0037"/>\n            <path d="M22 10.9541C23.1046 10.9541 24 10.0587 24 8.9541C24 7.84953 23.1046 6.9541 22 6.9541C20.8954 6.9541 20 7.84953 20 8.9541C20 10.0587 20.8954 10.9541 22 10.9541Z" fill="#FF0037"/>\n            <path d="M15 13.9541C15 15.0587 14.1046 15.9541 13 15.9541C11.8954 15.9541 11 15.0587 11 13.9541C11 12.8495 11.8954 11.9541 13 11.9541C14.1046 11.9541 15 12.8495 15 13.9541Z" fill="#FF0037"/>\n            <path d="M10 22.9541C10 24.0587 9.10457 24.9541 8 24.9541C6.89543 24.9541 6 24.0587 6 22.9541C6 21.8495 6.89543 20.9541 8 20.9541C9.10457 20.9541 10 21.8495 10 22.9541Z" fill="#FF0037"/>\n            <path d="M36 24.9541C34.8954 24.9541 34 24.0587 34 22.9541C34 21.8495 34.8954 20.9541 36 20.9541C37.1046 20.9541 38 21.8495 38 22.9541C38 24.0587 37.1046 24.9541 36 24.9541Z" fill="#FF0037"/>\n            </svg>',
        },
      },
      {
        title: {
          value: 'Whole home coverage',
        },
        description: {
          value:
            'Say goodbye to dead spots, drop-offs and buffering &mdash; even when the whole family is online. Get a consistently strong signal throughout your home.',
        },
        icon: {
          value:
            '<svg width="40" height="40" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M18.9571 4.93504C19.5973 4.54379 20.4027 4.54379 21.0429 4.93504L35.0429 13.4906C35.6374 13.8539 36 14.5004 36 15.1972V35.9539H39.8C39.9311 35.3076 40 34.6388 40 33.9538V15.1972C40 13.107 38.9122 11.1674 37.1287 10.0775L23.1287 1.52191C21.208 0.348166 18.792 0.348165 16.8713 1.52191L2.8713 10.0775C1.08777 11.1674 0 13.107 0 15.1972V33.9538C0 34.6388 0.0688632 35.3076 0.200044 35.9539H4V15.1972C4 14.5004 4.36259 13.8539 4.9571 13.4906L18.9571 4.93504Z" fill="#FF0037"/>\n            <path d="M38.0007 39.9539H28C27.9971 39.9539 27.9941 39.9538 27.9912 39.9538H13.0088L13 39.9539H1.9993C3.82371 42.3827 6.72838 43.9538 10 43.9538H30C33.2716 43.9538 36.1763 42.3827 38.0007 39.9539Z" fill="#FF0037"/>\n            <path d="M6.48926 18.4439C9.51729 15.6562 13.56 13.9538 18.0003 13.9538H22.0003C26.4407 13.9538 30.4834 15.6562 33.5114 18.4439L31.1651 21.7339C28.8148 19.3976 25.5762 17.9538 22.0003 17.9538H18.0003C14.4245 17.9538 11.1859 19.3976 8.83553 21.7339L6.48926 18.4439Z" fill="#FF0037"/>\n            <path d="M28.552 25.3982C26.7185 23.288 24.0152 21.9538 21.0003 21.9538H19.0003C15.9854 21.9538 13.2821 23.288 11.4487 25.3982L13.8856 28.8154C14.9413 27.0986 16.8371 25.9538 19.0003 25.9538H21.0003C23.1635 25.9538 25.0594 27.0986 26.1151 28.8154L28.552 25.3982Z" fill="#FF0037"/>\n            <path d="M17 32.9538C17 31.297 18.3431 29.9538 20 29.9538C21.6569 29.9538 23 31.297 23 32.9538C23 34.6107 21.6569 35.9538 20 35.9538C18.3431 35.9538 17 34.6107 17 32.9538Z" fill="#FF0037"/>\n            </svg>',
        },
      },
    ],
  },
}
describe('WhatMakesEero', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText } = render(<WhatMakesEero />)
    expect(getByText('Easy set up in minutes')).toBeInTheDocument()
    expect(getByText('What makes eero different?')).toBeInTheDocument()
  })
  it('should  render without button', () => {
    ;(useAppData as any).mockImplementation(() => ({
      ...mockData,
      tiles: {
        list: [],
      },
    }))
    const { queryByText } = render(<WhatMakesEero />)
    expect(queryByText('Easy set up in minutes')).not.toBeInTheDocument()
    expect(queryByText('What makes eero different?')).toBeInTheDocument()
  })
})
