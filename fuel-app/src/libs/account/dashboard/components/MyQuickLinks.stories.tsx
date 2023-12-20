import { Meta, Story } from '@storybook/react'
import MyQuickLinks from './MyQuickLinks'

export default {
  title: 'Account/MyQuickLinks',
  component: MyQuickLinks,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} as Meta

export const Default: Story = () => (
  <div style={{ padding: 16, maxWidth: 320 }}>
    <MyQuickLinks />
  </div>
)
