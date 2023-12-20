import { ComponentStory, ComponentMeta } from '@storybook/react'
import HoverReveal from './HoverReveal'

export default {
  title: 'Components/HoverReveal',
  component: HoverReveal,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HoverReveal>

const Template: ComponentStory<typeof HoverReveal> = (args) => (
  <HoverReveal {...args} />
)

export const HoverRevealStories = Template.bind({})
HoverRevealStories.args = {
  titleBackground: 'white',
  alignTitle: 'left',
  color: 'primary',
  title: 'OUR <br /> PAST',
  imageSrc:
    'https://frontier.com/resources/~/media/Why-Frontier/images/wf-time-future.jpg',
  contentTitle: 'OUR PAST',
  contentIntro:
    'We started in 1935 as a small telephone service provider, connecting communities across rural America.',
  contentDescription:
    'We were proud to be a friendly alternative to the large and remote corporate brands',
  contentTextColor: 'tertiary',
}
