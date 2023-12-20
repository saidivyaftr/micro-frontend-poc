import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Mail } from 'src/blitz/assets/react-icons'
import ArrowLink from './ArrowLink'

export default {
  title: 'Components/ArrowLink',
  component: ArrowLink,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'Go to',
    url: '/#',
    color: 'default',
    width: '20.91',
    height: '14.08',
    styleType: 'p1',
    wrapperClassName: '',
    isHover: true,
  },
} as ComponentMeta<typeof ArrowLink>

const Template: ComponentStory<typeof ArrowLink> = (args) => (
  <ArrowLink {...args} />
)

export const Default = Template.bind({})

export const WithIcon = Template.bind({})

WithIcon.args = {
  icon: <Mail />,
}
