import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { FourTiles } from '@/shared-ui/components'
import WhyChoose from 'src/libs/services/shared/WhyChoose'

jest.mock('src/hooks')

const productData = {
  title: {
    value: 'Why choose My Premium Tech Pro?',
  },
  subTitle: {
    value: 'Get guided tech support when you need it most',
  },
  tileList: {
    list: [
      {
        title: {
          value: 'Reach an expert in minutes',
        },
        description: {
          value:
            'Call a dedicated phone line to speak with a specialist 7 a.m. to midnight ET, 365 days a year.',
        },
        icon: {
          value: '',
        },
      },
    ],
  },
  backgroundColor: {
    color: {
      field: {
        value: '',
      },
    },
  },
}

describe('WhyChoose', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => productData)
    const { getByText } = render(<WhyChoose />)
    expect(getByText(/Why choose My Premium Tech Pro\?/i)).toBeInTheDocument()
    expect(
      getByText(/Get guided tech support when you need it most/i),
    ).toBeInTheDocument()
  })
})

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

describe('FourTiles', () => {
  it('should not render tiles correctly', () => {
    const { queryAllByTestId } = render(
      <FourTiles type="light" textAlign="left" tiles={[]} />,
    )
    const tiles = queryAllByTestId('test-title')
    expect(tiles.length).toBe(0)
  })
})
