import { render } from '@testing-library/react'
import { useAppData } from 'src/hooks'
import SpreadTheWord from 'src/libs/why-frontier/why-fiber-internet/fiber-expansion/SpreadTheWord'
import { FourTiles } from '@/shared-ui/components'

jest.mock('src/hooks')

const spreadTheWordMockData = {
  title: {
    value: 'Spread the word about Frontier Fiber',
  },
  description: {
    value:
      'Let your property management and neighbors know how excited you are for Frontier Fiber Internet.',
  },
  featurelist: {
    list: [
      {
        title: {
          value:
            'Let your property management know you want to sign up for fiber',
        },
        description: {
          value:
            'Send an email to let them know you want Frontier Fiber Internet as soon as possible and encourage them to reach out to us so we can enable fiber even faster.',
        },
        buttonText: {
          value: 'Email property owner',
        },
        copyToClipboard: {
          value: false,
        },
        emailSubjectLine: {
          value: 'Help us get Frontier Fiber Internet',
        },
        emailBody: {
          value:
            "Hi, %%break%% I just checked to see if my home is eligible for Frontier Fiber Internet, and Frontier let me know they're in the final steps of working with you to bring fiber to our community. %%break%% I'm really excited about Frontier's fiber speeds and can't wait to sign up. If you can fill out this form at https://frontier.com/resources/multifamily, a Frontier Business Development manager will follow up with next steps. %%break%% Thank you!",
        },
      },
      {
        title: {
          value: "Have your neighbors tell us they're interested in fiber",
        },
        description: {
          value:
            "with your neighbors via text, Facebook, or Nextdoor so they can tell us they're interested in fiber. The more interest we get, the faster we can bring fiber to you. Or, send them an email.",
        },
        buttonText: {
          value: 'Email Your neighbors',
        },
        copyToClipboard: {
          value: true,
        },
        emailSubjectLine: {
          value: 'Tell Frontier you want fiber internet',
        },
        emailBody: {
          value:
            "Hi, everyone. %%break%% I just checked to see if my address is eligible for Frontier Fiber Internet, and found out they're in the final steps of working with our property management to bring fiber to our community! %%break%% Frontier Fiber Internet supports speeds up to 5 Gbps (lightning fast), has 99.9% network reliability, and there are no data caps, overage charges, or hidden fees. %%break%% Go to https://frontier.com/myfiber and let them know you want fiber too. It only takes a minute, and the more interest we get, the faster they can enable fiber for our homes. %%break%% Thank you!",
        },
      },
    ],
  },
}

describe('SpreadTheWord', () => {
  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => spreadTheWordMockData)
    const { getByText, container } = render(<SpreadTheWord />)

    expect(
      getByText('Spread the word about Frontier Fiber'),
    ).toBeInTheDocument()

    expect(container.querySelector('#more')).toBeTruthy()
  })

  it('should render correctly', () => {
    ;(useAppData as any).mockImplementation(() => spreadTheWordMockData)
    const { getByText, container } = render(<SpreadTheWord />)
    expect(
      getByText(
        /Let your property management and neighbors know how excited you are for Frontier Fiber Internet./i,
      ),
    ).toBeInTheDocument()

    expect(container.querySelector('#more')).toBeTruthy()
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
