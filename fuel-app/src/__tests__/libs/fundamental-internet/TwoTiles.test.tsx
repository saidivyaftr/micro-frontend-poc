import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import TwoTiles from 'src/libs/fundamental-internet/TwoTiles'

jest.mock('src/hooks')
const mockData = {
  title: {
    value: 'Two tiles title',
  },
  tiles: {
    list: [
      {
        content: {
          value: 'Tile 1 content',
        },
        icon: {
          value: {
            field: {
              value: 'HomeWifi',
            },
          },
        },
      },
      {
        content: {
          value: 'Tile 2 content',
        },
        icon: {
          value: {
            field: {
              value: 'Wifi',
            },
          },
        },
      },
    ],
  },
}

describe('TwoTiles', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mockData)
    const { getByText, getAllByTestId } = render(<TwoTiles />)
    const component = getAllByTestId('two-tiles')[0]
    expect(
      component.querySelector('[data-testid=two-tiles-title]')?.innerHTML,
    ).toBe('Two tiles title')
    expect(getAllByTestId('two-tiles-tile').length).toBe(2)
    expect(getByText('Tile 1 content')).toBeInTheDocument()
    expect(getByText('Tile 2 content')).toBeInTheDocument()
  })

  it('should render only one list item', () => {
    ;(useAppData as any).mockImplementation(() => {
      return {
        ...mockData,
        tiles: {
          list: [
            {
              content: {
                value: 'Tile 1 content',
              },
              icon: {
                value: {
                  field: {
                    value: 'HomeWifi',
                  },
                },
              },
            },
          ],
        },
      }
    })
    const { getByText, getAllByTestId, queryByText } = render(<TwoTiles />)
    expect(getAllByTestId('two-tiles-tile').length).toBe(1)
    expect(getByText('Tile 1 content')).toBeInTheDocument()
    expect(queryByText('Tile 2 content')).not.toBeInTheDocument()
  })

  it('should not render without data', () => {
    ;(useAppData as any).mockImplementation(() => {
      return { ...mockData, tiles: { list: [] } }
    })
    const { queryByTestId } = render(<TwoTiles />)
    const component = queryByTestId('two-tiles')
    expect(component).not.toBeInTheDocument()
  })
})
