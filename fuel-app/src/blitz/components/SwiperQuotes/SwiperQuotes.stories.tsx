import { ComponentStory, ComponentMeta } from '@storybook/react'
import SwiperQuotes from './SwiperQuotes'

export default {
  title: 'Components/SwiperQuotes',
  component: SwiperQuotes,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SwiperQuotes>

const Template: ComponentStory<typeof SwiperQuotes> = (args) => (
  <SwiperQuotes {...args} />
)

export const SwiperQuotesStories = Template.bind({})
SwiperQuotesStories.args = {
  heading: 'Testimonials',
  slides: [
    {
      quote: `“Fiber speeds are amazing! I was so sick of cable slow speeds especially uploads. I'm so happy that Frontier expanded fiber to my neighborhood! Thank you!"`,
      credit: `Cody M.`,
    },
    {
      quote: `“This is quote 2"`,
      credit: `Jane Doe`,
    },
    {
      quote: `“Quote 3 here lorem ipsum"`,
      credit: `John Doe`,
    },
  ],
}
