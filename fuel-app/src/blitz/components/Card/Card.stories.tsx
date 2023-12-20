import React from 'react'
import { ComponentMeta, ComponentStory, Story } from '@storybook/react'
import Card from './Card'
import Typography from '../Typography'

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => (
  <div style={{ maxWidth: 850, margin: 'auto' }}>
    <Card {...args} />
  </div>
)

export const Default = Template.bind({})

Default.args = {}

export const Content = Template.bind({})
Content.args = {
  // title: 'My account',
  // labelLink: 'Go to profile',
  // url: '#',
  children: <p>Test</p>,
}

const styles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  columnGap: '.5rem',
  padding: '1rem',
}

export const ManyCards: Story = () => (
  <div style={styles}>
    <Card>
      <Typography>Card 1</Typography>
    </Card>
    <Card>
      <Typography>Card 2</Typography>
    </Card>
    <Card>
      <Typography>Card 3</Typography>
    </Card>
    <Card>
      <Typography>Card 4</Typography>
    </Card>
  </div>
)
