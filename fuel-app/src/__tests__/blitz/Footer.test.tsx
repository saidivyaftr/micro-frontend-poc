import { Footer } from '@/shared-ui/components'
import { render } from '@testing-library/react'
jest.mock('src/hooks')

describe('Footer', () => {
  it('should render correctly', () => {
    const { getAllByTestId, getByTestId } = render(
      <Footer
        onClickCallback={() => void 0}
        bottomLinks={[
          {
            href: 'test bottomLinks href 1',
            title: 'test bottomLinks title 1',
          },
          {
            href: 'test bottomLinks href 2',
            title: 'test bottomLinks title 2',
          },
        ]}
        copyRights="test copyRights"
        legalText="test legalText"
        links={[
          {
            children: [
              {
                href: 'test href 1',
                title: 'test plans 1',
              },
              {
                href: 'test href 2',
                title: 'test plans 2',
              },
            ],
            title: 'test category title 1',
          },
          {
            children: [
              {
                href: 'test href 1',
                title: 'test plans 1',
              },
              {
                href: 'test href 2',
                title: 'test plans 2',
              },
            ],
            title: 'test category title 2',
          },
        ]}
        socialMediaLinks={[
          {
            href: 'test socialMediaLinks href 1',
            icon: <div />,
          },
          {
            href: 'test socialMediaLinks href 2',
            icon: <div />,
          },
        ]}
      />,
    )

    const category = getAllByTestId('test-mainlink-category')

    const socialMediaLinks = getAllByTestId('test-socialMediaLinks')
    const bottomLinks = getAllByTestId('test-bottomLinks')
    // const description = getAllByTestId('test-description')
    const legalText = getByTestId('test-legalText')
    const copyRights = getByTestId('test-copyRights')

    expect(legalText.textContent).toBe('test legalText')
    expect(copyRights.textContent).toBe('test copyRights')

    for (let i = 0; i < socialMediaLinks.length; i++) {
      expect(socialMediaLinks[i].getAttribute('href')).toBe(
        'test socialMediaLinks href ' + (i + 1),
      )
    }
    for (let i = 0; i < category.length; i++) {
      const links = getAllByTestId('test-mainlink-item-' + i)
      expect(category[i].textContent).toBe('test category title ' + (i + 1))
      for (let j = 0; j < links.length; j++) {
        expect(links[j].textContent).toBe('test plans ' + (j + 1))
        expect(links[j].getAttribute('href')).toBe('test href ' + (j + 1))
      }
    }

    for (let i = 0; i < bottomLinks.length; i++) {
      expect(bottomLinks[i].textContent).toBe(
        'test bottomLinks title ' + (i + 1),
      )
      expect(bottomLinks[i].getAttribute('href')).toBe(
        'test bottomLinks href ' + (i + 1),
      )
    }
  })
})
