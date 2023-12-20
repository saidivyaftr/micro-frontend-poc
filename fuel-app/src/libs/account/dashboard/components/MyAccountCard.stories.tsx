import { ComponentMeta, ComponentStory } from '@storybook/react'
import MyAccountCard from './MyAccountCard'

export default {
  title: 'Account/MyAccountCard',
  component: MyAccountCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    firstName: 'Justin',
    lastName: 'Moosetown',
    contents: [
      { title: 'Account No.', description: '1122-345-678-1200' },
      {
        title: 'Address',
        description: '2124 Monteagle Lake Drive Alcoa, TN 38902',
      },
      {
        title: 'PIN',
        description: 'PIN',
        tooltipText:
          'The PIN is used by Frontier call centers to confirm your identity and protect your account from unauthorized access.',
      },
    ],
  },
} as ComponentMeta<typeof MyAccountCard>

const Template: ComponentStory<typeof MyAccountCard> = (args) => (
  <MyAccountCard {...args} />
)

export const Default = Template.bind({})
