import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import OTPInput from './OTPInput'

export default {
  title: 'Components/OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof OTPInput>

const Template: ComponentStory<typeof OTPInput> = (args) => {
  const [value, setValue] = useState('')
  return (
    <div style={{ maxWidth: 600, margin: 32 }}>
      <OTPInput {...args} value={value} onChange={setValue} />
    </div>
  )
}

export const OTPInputStories = Template.bind({})
OTPInputStories.args = {}
