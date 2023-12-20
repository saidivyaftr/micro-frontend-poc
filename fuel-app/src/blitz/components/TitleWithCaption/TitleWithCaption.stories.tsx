import { ComponentStory, ComponentMeta } from '@storybook/react'
import TitleWithCaption from './TitleWithCaption'

export default {
  title: 'Components/TitleWithCaption',
  component: TitleWithCaption,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof TitleWithCaption>

const Template: ComponentStory<typeof TitleWithCaption> = (args) => (
  <TitleWithCaption {...args} />
)

export const TitleWithCaptionStories = Template.bind({})
TitleWithCaptionStories.args = {
  title:
    'Frontier ranked #1 in Best Internet Service Providers for Gaming 2021',
  backgroundColor: 'dark-blue',
  fontColor: 'white',
  disclaimerText: 'By US News & world report',
}
