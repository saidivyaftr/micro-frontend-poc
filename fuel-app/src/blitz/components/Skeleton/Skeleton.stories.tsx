import { ComponentStory, ComponentMeta } from '@storybook/react'
import Skeleton from './Skeleton'

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
)

export const SkeletonStories = Template.bind({})
SkeletonStories.args = {}
