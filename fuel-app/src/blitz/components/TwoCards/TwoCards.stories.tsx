import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TwoCards from './TwoCards'

export default {
  title: 'Components/TwoCards',
  component: TwoCards,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TwoCards>

const Template: ComponentStory<typeof TwoCards> = (args) => (
  <TwoCards {...args} />
)

export const TwoCardsStories = Template.bind({})

TwoCardsStories.args = {
  heading: 'Why Frontier® Fiber Gig Service?',
  subheading: `Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet`,
  copy: 'Do everything fiber fast. Work, live and play how you want with the power of our 100% fiber-optic network.',
  cards: [
    {
      image: {
        srcMobile: 'https://via.placeholder.com/150x175',
        srcTablet: 'https://via.placeholder.com/250x250',
        altText: 'Placeholder image',
      },
      heading: 'Work from home like a pro',
      eyebrow: '',
      multiplier: '50x ',
      copy: 'faster uploads than cable¹',
    },
    {
      image: {
        srcMobile: 'https://via.placeholder.com/150x175',
        srcTablet: 'https://via.placeholder.com/250x250',
        altText: 'Placeholder image',
      },
      heading: 'Upgrade your entertainment',
      eyebrow: '',
      multiplier: '5x ',
      copy: 'faster downloads than cable¹',
    },
  ],
  disclaimer: `1: Based on FCC 12/31/2021 MBA, weighted median cable speed.`,
}
