import { ComponentStory, ComponentMeta } from '@storybook/react'
import ArticleCard from './ArticleCard'

export default {
  title: 'Components/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ArticleCard>

const Template: ComponentStory<typeof ArticleCard> = (args) => (
  <ArticleCard {...args} />
)

export const ArticleCardStories = Template.bind({})
ArticleCardStories.args = {
  title: 'Help Center Articles',
  subtext:
    'Get the help you need with step-by-step solutions to your questions.',
  cards: [
    {
      title: 'TV & Video',
      subtitle: 'How to pay your bill',
      href: '/',
      type: 'link',
    },
    {
      title: 'Billing',
      subtitle: 'Set Up, Change, or Stop AutoPay',
      href: '/',
      type: 'link',
    },
    {
      title: 'Account',
      subtitle: 'Change My Password or FrontierID',
      href: '/',
      type: 'link',
    },
    {
      title: 'Internet',
      subtitle: 'Restart My Router',
      href: '/',
      type: 'link',
    },
    {
      title: 'Billing',
      subtitle: 'Set Up, Change, or Stop AutoPay',
      href: '/',
      type: 'link',
    },
    {
      title: 'Internet',
      subtitle: 'Restart My Router',
      href: '/',
      type: 'link',
    },
    {
      title: 'Billing',
      subtitle: 'Set Up, Change, or Stop AutoPay',
      href: '/',
      type: 'link',
    },
    {
      title: '',
      subtitle: `Didn't find what you were looking for?`,
      href: '/search',
      type: 'search',
    },
  ],
  shouldTruncate: true,
  cardsPerRow: 3,
  itemsPerView: 3,
  cardsContainerClassName: '',
}
