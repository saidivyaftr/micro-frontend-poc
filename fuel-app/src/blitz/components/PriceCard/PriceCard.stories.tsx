import { ComponentStory, ComponentMeta } from '@storybook/react'
import PriceCard from './PriceCard'

export default {
  title: 'Components/PriceCard',
  component: PriceCard,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PriceCard>

const Template: ComponentStory<typeof PriceCard> = (args) => (
  <PriceCard {...args} />
)

export const PriceCardStories = Template.bind({})
PriceCardStories.args = {
  title: 'ENTERTAINMENT Package',
  price: '<sup>$</sup>74.99/mo<span>*</span>',
  subText: '+ tax',
  ctaText: 'order now',
  ctaLink: 'https://www.directv.com/stream/frontier/',
  bottomDescription: 'Includes 40,000+ titles On Demand and more.',
  mostPopular: 'Most popular',
}
