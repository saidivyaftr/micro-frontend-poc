import FilterCities from 'src/libs/local/components/FilterCities'
import { render, waitFor, screen } from '@testing-library/react'

jest.mock('src/hooks')
const mockedContextItem = {
  title: {
    value: 'Cities',
  },
}
const mockedData = {
  description: { value: 'A list of cities in the US' },
  statesList: [
    {
      name: {
        value: 'Alabama',
      },
      code: {
        value: 'AL',
      },
      url: {
        value: 'alabama',
      },
      cityList: [
        {
          char: 'A',
          list: [
            {
              name: {
                value: 'Atmore',
              },
              url: {
                value: 'atmore',
              },
              link: {
                value: true,
              },
            },
          ],
        },
        {
          char: 'B',
          list: [],
        },
        {
          char: 'C',
          list: [
            {
              name: {
                value: 'Camden',
              },
              url: {
                value: 'camden',
              },
              link: {
                value: true,
              },
            },
          ],
        },
        {
          char: 'M',
          list: [
            {
              name: {
                value: 'Monroeville',
              },
              url: {
                value: 'monroeville',
              },
              link: {
                value: true,
              },
            },
          ],
        },
      ],
    },
    ,
  ],
}

describe('FilterCities', () => {
  it('should render correctly with data props', async () => {
    jest.mock('next/router', () => ({
      useRouter: jest.fn().mockReturnValue({
        query: {
          state: 'alabama',
        },
      }),
    }))
    render(<FilterCities data={mockedData} contextItem={mockedContextItem} />)

    await waitFor(() => {
      expect(screen.getByTestId('citiesContainer')).toBeInTheDocument()
      expect(screen.getByText('Cities')).toBeInTheDocument()
      expect(screen.getByText('A list of cities in the US')).toBeInTheDocument()
    })
  })

  it('should render nothing if data props is not passed down', async () => {
    render(<FilterCities />)
    await waitFor(() => {
      expect(screen.queryByTestId('citiesContainer')).toBeNull()
    })
  })
})
