import { ComponentStory, ComponentMeta } from '@storybook/react'
import SomethingWrong from './SomethingWrong'

export default {
  title: 'Components/SomethingWrong',
  component: SomethingWrong,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SomethingWrong>

const Template: ComponentStory<typeof SomethingWrong> = () => <SomethingWrong />

export const SomethingWrongExample = Template.bind({})
