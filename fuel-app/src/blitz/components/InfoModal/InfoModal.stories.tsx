import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import InfoModal from './InfoModal'

export default {
  title: 'Components/InfoModal',
  component: InfoModal,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof InfoModal>

const Template: ComponentStory<typeof InfoModal> = (args) => (
  <InfoModal {...args} />
)

export const ModalStories = Template.bind({})
ModalStories.args = {
  isOpen: true,
  isLoading: true,
  title: 'Continue loading',
  subTitle:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  ",
}
