import { ComponentStory, ComponentMeta } from '@storybook/react'
import BlackHeader from './BlackHeader'

export default {
  title: 'Components/BlackHeader',
  component: BlackHeader,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BlackHeader>

const Template: ComponentStory<typeof BlackHeader> = (args) => (
  <BlackHeader {...args} />
)

export const BlackHeaderExample = Template.bind({})

BlackHeaderExample.args = {
  title: 'California privacy law',
}
