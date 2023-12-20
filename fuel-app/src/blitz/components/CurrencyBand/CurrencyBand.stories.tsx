import { ComponentMeta, ComponentStory } from '@storybook/react'
import CurrencyBand from './CurrencyBand'

export default {
  title: 'Components/CurrencyBand',
  component: CurrencyBand,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    amount: '126.78',
  },
} as ComponentMeta<typeof CurrencyBand>

const Template: ComponentStory<typeof CurrencyBand> = (args) => (
  <CurrencyBand {...args} />
)

export const Default = Template.bind({})

export const SmallSquare = Template.bind({})
SmallSquare.args = {
  amount: '126.78',
  variant: 'small-square',
}

export const SmallRect = Template.bind({})
SmallRect.args = {
  amount: '126.78',
  variant: 'small-rect',
}

export const LargeSquare = Template.bind({})
LargeSquare.args = {
  amount: '126.78',
  variant: 'large-square',
}
