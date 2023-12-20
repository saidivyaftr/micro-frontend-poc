import { ComponentStory, ComponentMeta } from '@storybook/react'
import HeroStripes from './HeroStripes'
import { Typography, Button } from '@/shared-ui/components'

export default {
  title: 'Components/HeroStripes',
  component: HeroStripes,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HeroStripes>

const Template: ComponentStory<typeof HeroStripes> = (args) => (
  <HeroStripes {...args} />
)

export const HeroStripesStories = Template.bind({})
HeroStripesStories.args = {
  backgroundImage:
    'https://frontier.com/~/media/Why-Frontier/images/wf-banner.jpg',
  mobileBackgroundImage:
    'https://frontier.com/~/media/Why-Frontier/images/wf-banner-sm.jpg',
  content: (
    <>
      <Typography tagType="h1" styleType="h1" color="primary">
        Hero
      </Typography>
      <Typography tagType="h1" styleType="h1">
        Frontier
      </Typography>
      <Typography styleType="p1">
        We’re pushing what’s possible — to go beyond where we’ve been and see
        what we can achieve, together.
      </Typography>
      <Button
        text={'LEARN MORE'}
        type="button"
        onClick={() => undefined}
        variant="secondary"
      />
    </>
  ),
}
