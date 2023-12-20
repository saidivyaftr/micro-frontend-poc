import { ComponentStory, ComponentMeta } from '@storybook/react'
import Testimonial from './Testimonial'

export default {
  title: 'Components/Testimonial',
  component: Testimonial,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Testimonial>

const Template: ComponentStory<typeof Testimonial> = (args) => (
  <Testimonial {...args} />
)

export const TestimonialStories = Template.bind({})
TestimonialStories.args = {
  eyebrowText: 'Testimonials',
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
  backgroundColor: 'gravity',
  pagination: true,
  navigation: true,
}
