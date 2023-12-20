import { ComponentStory, ComponentMeta } from '@storybook/react'
import Alert from './Alert'

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />

export const MessageAlert = Template.bind({})

MessageAlert.args = {
  isSuccess: false,
  handleClose: () => {
    return
  },
  message:
    'Message goes here, lorem ipsum dolor set amet et al. If you want more information, click here',
  strongText: 'Testing!',
}

export const SuccessAlert = Template.bind({})

SuccessAlert.args = {
  isSuccess: true,
  strongText: 'Testing!',
  backgroundColor: '#14198',
  handleClose: () => {
    return
  },
  message:
    'Message goes here, lorem ipsum dolor set amet et al. If you want more information, click here',
}
