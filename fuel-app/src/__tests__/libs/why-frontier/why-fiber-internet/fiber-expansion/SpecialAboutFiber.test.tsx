import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import SpecialAboutFiber from 'src/libs/why-frontier/why-fiber-internet/fiber-expansion/SpecialAboutFiber'
import { FourTiles } from '@/shared-ui/components'

jest.mock('src/hooks')

const specialAboutFiberMockData = {
  title: {
    value: 'What’s special about fiber internet?',
  },
  subTitle: {
    value:
      'Find out how fiber-optic technology can revolutionize your home internet experience.',
  },
  legalDisclaimer: {
    value: '',
  },
  toolTipText: {
    value: '',
  },
  tooltipDirection: {
    targetItem: null,
  },
  list: {
    targetItems: [
      {
        title: {
          value: 'It’s blazing fast',
        },
        toolTip: null,
        description: {
          value:
            'Fiber sends information using beams of light, so data can be sent faster &mdash; delivering speeds up to 5 Gbps (lightning fast).',
        },
        icon: {
          value:
            '<svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M2 26.5C2 15.4543 10.9543 6.5 22 6.5H26C37.0457 6.5 46 15.4543 46 26.5V31.5C46 32.54 45.8557 33.5463 45.5859 34.5H41.3264C41.7583 33.5907 42 32.5736 42 31.5V26.5C42 17.6634 34.8366 10.5 26 10.5H22C13.1634 10.5 6 17.6634 6 26.5V31.5C6 32.5736 6.24169 33.5907 6.67363 34.5H2.41407C2.14433 33.5463 2 32.54 2 31.5V26.5Z" fill="#FF0037"/>\n<path d="M4.51432 38.5C6.53191 40.943 9.58413 42.5 13 42.5H35C38.4159 42.5 41.4681 40.943 43.4857 38.5H4.51432Z" fill="#FF0037"/>\n<path d="M18.3414 34.5H29.6586C29.8797 33.8744 30 33.2013 30 32.5C30 30.8926 29.3679 29.4328 28.3387 28.3557L34.548 20.7666C34.8305 20.4217 35 19.9806 35 19.5C35 18.3954 34.1046 17.5 33 17.5C32.3658 17.5 31.8006 17.7951 31.4342 18.2556L24.6595 26.5358C24.4429 26.5121 24.2229 26.5 24 26.5C20.6863 26.5 18 29.1863 18 32.5C18 33.2013 18.1203 33.8744 18.3414 34.5Z" fill="#FF0037"/>\n<path d="M24 16.5C25.1046 16.5 26 15.6046 26 14.5C26 13.3954 25.1046 12.5 24 12.5C22.8954 12.5 22 13.3954 22 14.5C22 15.6046 22.8954 16.5 24 16.5Z" fill="#FF0037"/>\n<path d="M17 19.5C17 20.6046 16.1046 21.5 15 21.5C13.8954 21.5 13 20.6046 13 19.5C13 18.3954 13.8954 17.5 15 17.5C16.1046 17.5 17 18.3954 17 19.5Z" fill="#FF0037"/>\n<path d="M12 28.5C12 29.6046 11.1046 30.5 10 30.5C8.89543 30.5 8 29.6046 8 28.5C8 27.3954 8.89543 26.5 10 26.5C11.1046 26.5 12 27.3954 12 28.5Z" fill="#FF0037"/>\n<path d="M38 30.5C36.8954 30.5 36 29.6046 36 28.5C36 27.3954 36.8954 26.5 38 26.5C39.1046 26.5 40 27.3954 40 28.5C40 29.6046 39.1046 30.5 38 30.5Z" fill="#FF0037"/>\n</svg>\n',
        },
      },
      {
        title: {
          value: 'It’s reliable',
        },
        toolTip: null,
        description: {
          value:
            'Our 100% fiber-optic network delivers 99.9% network reliability so you can stay connected to what matters most.',
        },
        icon: {
          value:
            '<svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M18.3335 9.5C18.3335 6.18629 21.0198 3.5 24.3335 3.5C27.6472 3.5 30.3335 6.18629 30.3335 9.5C30.3335 12.1124 28.6639 14.3349 26.3335 15.1586L26.3335 42.4831C27.3757 42.4647 28.3781 42.4306 29.3335 42.378V30.775L31.9738 25.6223C30.957 24.5474 30.3335 23.0965 30.3335 21.5C30.3335 18.1863 33.0198 15.5 36.3335 15.5C39.6472 15.5 42.3335 18.1863 42.3335 21.5C42.3335 24.8137 39.6472 27.5 36.3335 27.5C36.0622 27.5 35.7951 27.482 35.5334 27.4471L33.3335 31.7402L33.3335 41.9998C34.2505 41.8665 35.0909 41.7027 35.8436 41.5039C37.2494 41.1326 38.17 40.6835 38.7071 40.2299C39.1738 39.8358 39.3335 39.4661 39.3335 39.0001C39.3335 38.154 39.071 37.6768 38.6604 37.3076C38.2186 36.9105 37.4819 36.5362 36.3335 36.2393V32.1396C36.4881 32.1702 36.6405 32.2022 36.7905 32.2357C38.4776 32.6127 40.1071 33.2294 41.3347 34.3331C42.6446 35.5108 43.3335 37.0961 43.3335 39.0001C43.3335 40.784 42.5418 42.2269 41.2881 43.2858C40.1046 44.2854 38.5357 44.93 36.865 45.3713C33.5193 46.2549 29.0452 46.5001 24.3335 46.5001C19.5737 46.5001 15.1068 46.1241 11.7655 45.1738C10.1022 44.7007 8.56342 44.0434 7.40373 43.0955C6.19379 42.1065 5.3335 40.7345 5.3335 39.0001C5.3335 37.0961 6.02241 35.5108 7.33226 34.3331C8.5599 33.2294 10.1894 32.6127 11.8765 32.2357C12.0265 32.2022 12.1789 32.1702 12.3335 32.1396V36.2393C11.1851 36.5362 10.4484 36.9105 10.0066 37.3076C9.59597 37.6768 9.3335 38.154 9.3335 39.0001C9.3335 39.2656 9.4246 39.5811 9.93515 39.9984C10.4959 40.4568 11.4468 40.9244 12.8598 41.3264C13.6029 41.5377 14.4313 41.7193 15.3334 41.8722L15.3334 31.7402L13.1335 27.4471C12.8718 27.482 12.6048 27.5 12.3335 27.5C9.01979 27.5 6.3335 24.8137 6.3335 21.5C6.3335 18.1863 9.01979 15.5 12.3335 15.5C15.6472 15.5 18.3335 18.1863 18.3335 21.5C18.3335 23.0965 17.7099 24.5474 16.6931 25.6224L19.3334 30.775L19.3334 42.3341C20.2903 42.4027 21.293 42.4497 22.3335 42.4757L22.3335 15.1586C20.0031 14.3349 18.3335 12.1124 18.3335 9.5ZM24.3335 7.5C23.2289 7.5 22.3335 8.39543 22.3335 9.5C22.3335 10.6046 23.2289 11.5 24.3335 11.5C25.4381 11.5 26.3335 10.6046 26.3335 9.5C26.3335 8.39543 25.4381 7.5 24.3335 7.5ZM36.3335 19.5C35.2289 19.5 34.3335 20.3954 34.3335 21.5C34.3335 22.6046 35.2289 23.5 36.3335 23.5C37.4381 23.5 38.3335 22.6046 38.3335 21.5C38.3335 20.3954 37.4381 19.5 36.3335 19.5ZM12.3335 19.5C13.4381 19.5 14.3335 20.3954 14.3335 21.5C14.3335 22.6046 13.4381 23.5 12.3335 23.5C11.2289 23.5 10.3335 22.6046 10.3335 21.5C10.3335 20.3954 11.2289 19.5 12.3335 19.5Z" fill="#FF0037"/>\n</svg>\n',
        },
      },
      {
        title: {
          value: 'It’s future-proof',
        },
        toolTip: null,
        description: {
          value:
            'Fiber-optic cables are built to last and are capable of carrying data at today’s speeds and the speeds of the future.',
        },
        icon: {
          value:
            '<svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M34.1665 16.5L37.1665 19.5L22.1665 34.5L14.6665 27L17.6665 24L22.1665 28.5L34.1665 16.5Z" fill="#FF0037"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M44.6665 7.5L40.6028 7.90637C36.7484 8.29181 32.8724 7.42355 29.5508 5.43057L24.6665 2.5L19.7822 5.43058C16.4606 7.42355 12.5846 8.29181 8.73022 7.90637L4.6665 7.5V24.1762C4.6665 31.2015 8.35248 37.7116 14.3766 41.3261L24.6665 47.5L34.9564 41.326C40.9805 37.7116 44.6665 31.2015 44.6665 24.1762V7.5ZM40.6665 11.9174C36.0661 12.3067 31.4566 11.2388 27.4928 8.86055L24.6665 7.16476L21.8402 8.86055C17.8764 11.2388 13.2669 12.3067 8.6665 11.9174V24.1762C8.6665 29.7964 11.6153 35.0045 16.4346 37.8961L24.6665 42.8352L32.8984 37.8961C37.7177 35.0045 40.6665 29.7964 40.6665 24.1762V11.9174Z" fill="#FF0037"/>\n</svg>\n',
        },
      },
    ],
  },
}

describe('SpecialAboutFiber', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => specialAboutFiberMockData)
    const { getByText, container } = render(<SpecialAboutFiber />)

    expect(
      getByText(/What’s special about fiber internet?/i),
    ).toBeInTheDocument()

    expect(container.querySelector('#special-about-fiber')).toBeTruthy()
  })

  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => specialAboutFiberMockData)
    const { getByText, container } = render(<SpecialAboutFiber />)
    expect(
      getByText(
        /Find out how fiber-optic technology can revolutionize your home internet experience./i,
      ),
    ).toBeInTheDocument()

    expect(container.querySelector('#special-about-fiber')).toBeTruthy()
  })

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
  it('should not render correctly', () => {
    ;(useAppData as any).mockImplementation(() => {
      return []
    })
  })
})
