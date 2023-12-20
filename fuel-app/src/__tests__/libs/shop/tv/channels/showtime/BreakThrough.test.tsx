import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import { ShowTimeBreakThrough } from 'src/libs/shop/tv/channels/showtime'

jest.mock('src/hooks')

const mock = {
  breakThroughList: {
    list: [
      {
        image: {
          alt: '1',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/desktop/Frontier_LandingPage_ContentTile_EverythingEverywhereAllAtOnce.png?rev=30fdcf1849c841fd931a4922a8ba3c33',
        },
        mobileImage: {
          alt: '1',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/mobile/SHOWTIME_FTR-Landing-Page_The-Green-Knight_Horizontal-Content-Tile-1.png?rev=dcfda789804a495ea8520dc34fb9cfa6',
        },
      },
      {
        image: {
          alt: '2',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/desktop/Frontier_LandingPage_ContentTile_SHOChampBox.png?rev=56167569e9a84618a0e50cccb14ddd23',
        },
        mobileImage: {
          alt: '2',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/mobile/SHOWTIME_FTR-Landing-Page_The-Green-Knight_Horizontal-Content-Tile-1.png?rev=dcfda789804a495ea8520dc34fb9cfa6',
        },
      },
      {
        image: {
          alt: '3',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/desktop/Frontier_LandingPage_ContentTile_EverythingEverywhereAllAtOnce.png?rev=30fdcf1849c841fd931a4922a8ba3c33',
        },
        mobileImage: {
          alt: '3',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/mobile/SHOWTIME_FTR-Landing-Page_The-Green-Knight_Horizontal-Content-Tile-1.png?rev=dcfda789804a495ea8520dc34fb9cfa6',
        },
      },
      {
        image: {
          alt: '4',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/desktop/Frontier_LandingPage_ContentTile_SHOChampBox.png?rev=56167569e9a84618a0e50cccb14ddd23',
        },
        mobileImage: {
          alt: '4',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/mobile/SHOWTIME_FTR-Landing-Page_The-Green-Knight_Horizontal-Content-Tile-1.png?rev=dcfda789804a495ea8520dc34fb9cfa6',
        },
      },
      {
        image: {
          alt: '5',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/desktop/Frontier_LandingPage_ContentTile_EverythingEverywhereAllAtOnce.png?rev=30fdcf1849c841fd931a4922a8ba3c33',
        },
        mobileImage: {
          alt: '5',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/mobile/SHOWTIME_FTR-Landing-Page_The-Green-Knight_Horizontal-Content-Tile-1.png?rev=dcfda789804a495ea8520dc34fb9cfa6',
        },
      },
      {
        image: {
          alt: '6',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/desktop/Frontier_LandingPage_ContentTile_SHOChampBox.png?rev=56167569e9a84618a0e50cccb14ddd23',
        },
        mobileImage: {
          alt: '6',
          src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/mobile/SHOWTIME_FTR-Landing-Page_The-Green-Knight_Horizontal-Content-Tile-1.png?rev=dcfda789804a495ea8520dc34fb9cfa6',
        },
      },
    ],
  },
  title: {
    value: 'title',
  },
  description: {
    value: 'description',
  },
  mobilebanner: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/mobile/Place-Image1.png?rev=93863011b51b4c80a376dc7907e47d09',
    alt: 'Yellowjackets',
  },
  desktopbanner: {
    src: 'https://vsgstoqarg-539670-cdn-endpoint.azureedge.net/-/jssmedia/Project/Frontier/Dotcom/Images/showtime-page/desktop/Frontier-Landing-Page---Mid-Page-Hero---Yellowjackets.png?rev=38c46eed51904dc48ae01eef1e9d4362',
    alt: 'Yellowjackets',
  },
}

describe('BreakThrough', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => mock)

    const { getByText, queryByTestId, getAllByTestId } = render(
      <ShowTimeBreakThrough />,
    )
    expect(queryByTestId('break-through')).toBeInTheDocument()
    expect(getByText('title')).toBeInTheDocument()
    expect(getByText('description')).toBeInTheDocument()
    expect(getAllByTestId('cardImage').length).toBe(1)
    expect(getAllByTestId('image').length).toBe(6)
  })

  it('should not render without title', () => {
    ;(useAppData as any).mockImplementation(() => {
      return { title: { value: '' }, description: { value: '' } }
    })
    const { queryByTestId } = render(<ShowTimeBreakThrough />)
    expect(queryByTestId('break-through')).not.toBeInTheDocument()
  })
})
