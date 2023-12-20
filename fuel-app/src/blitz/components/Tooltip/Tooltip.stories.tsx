import { ComponentStory, ComponentMeta } from '@storybook/react'
import { QuestionIcon } from '@/shared-ui/react-icons'
import Tooltip from './Tooltip'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />

export const TooltipStories = Template.bind({})

TooltipStories.args = {
  tooltipIcon: <QuestionIcon />,
  tooltipText:
    'How fast you can receive data. Fast download speeds are important for streaming, downloading videos and pictures and loading web pages.',
  includeBorder: true,
}
