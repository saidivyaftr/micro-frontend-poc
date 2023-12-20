import { ComponentStory, ComponentMeta } from '@storybook/react'
import { QuestionIcon } from '@/shared-ui/react-icons'
import TooltipPopover from './TooltipPopover'

export default {
  title: 'Components/TooltipPopover',
  component: TooltipPopover,
} as ComponentMeta<typeof TooltipPopover>

const Template: ComponentStory<typeof TooltipPopover> = (args) => (
  <TooltipPopover {...args} />
)

export const Tooltip = Template.bind({})

Tooltip.args = {
  tooltipIcon: <QuestionIcon />,
  tooltipDirection: 'top',
  dropShadow: true,
  hideBorder: true,
  hideOnMouseLeave: false,
  tooltipContent:
    'How fast you can receive data. Fast download speeds are important for streaming, downloading videos and pictures and loading web pages.',
}
