import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CardWithTitle } from './Card'

export default {
  title: 'Components/CardWithTitle',
  component: CardWithTitle,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CardWithTitle>

const Template: ComponentStory<typeof CardWithTitle> = (args) => (
  <CardWithTitle {...args} />
)

export const Default = Template.bind({})

Default.args = {}

export const MyAccount = Template.bind({})
MyAccount.args = {
  title: 'My account',
  labelLink: 'Go to profile',
  url: '#',
  children: <p>Test</p>,
  arrowColor: '#14198',
  hoverColor: 'primary',
}
