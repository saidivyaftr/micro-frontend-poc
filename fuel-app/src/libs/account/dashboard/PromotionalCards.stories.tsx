import { Meta, Story } from '@storybook/react'
import PromotionalCards from './PromotionalCards'

export default {
  title: 'Account/PromotionalCards',
  component: PromotionalCards,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const Default: Story = () => (
  <div
    style={{
      boxSizing: 'border-box',
      height: 204,
      maxWidth: 900,
      padding: '0 1rem',
      background: 'gray',
    }}
  >
    <PromotionalCards />
  </div>
)
