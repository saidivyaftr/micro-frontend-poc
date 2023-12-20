import { ComponentStory, ComponentMeta } from '@storybook/react'
import SwiperTabs from './SwiperTabs'

export default {
  title: 'Components/SwiperTabs',
  component: SwiperTabs,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SwiperTabs>

const Template: ComponentStory<typeof SwiperTabs> = (args) => (
  <SwiperTabs {...args} />
)

export const SwiperTabsExample = Template.bind({})
SwiperTabsExample.args = {
  tabs: ['Tab1', 'Tab2'],
  selectedTabIndex: 0,
}
