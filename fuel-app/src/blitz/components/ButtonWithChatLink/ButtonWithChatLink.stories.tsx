import { ComponentStory, ComponentMeta } from '@storybook/react'
import ButtonWithChatLink from './ButtonWithChatLink'
import store from 'src/redux/Store'
import { appConfigSlice } from 'src/redux/slicers'
import { Provider } from 'react-redux'
import { useEffect } from 'react'

export default {
  title: 'Components/ButtonWithChatLink',
  component: ButtonWithChatLink,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ButtonWithChatLink>

const Template: ComponentStory<typeof ButtonWithChatLink> = (args) => {
  useEffect(() => {
    store.dispatch(appConfigSlice.actions.setConfig({ isChatOpen: false }))
  }, [])
  return (
    <Provider store={store}>
      <ButtonWithChatLink {...args} />
    </Provider>
  )
}

export const CardAndImageStories = Template.bind({})
CardAndImageStories.args = {
  hoverVariant: 'primary',
  buttonName: 'VIEW INTERNET PLANS',
  buttonLink: 'https://internet.frontier.com/youtubetv/',
  labelLinkText: 'Already a customer?',
  labelName: 'Chat now',
  bgType: 'dark',
  labelNameColor: 'black',
  labelLinkTextColor: 'red',
  labelFontType: 'mediumFont',
  labelStyleType: 'p1',
  labelTagType: 'p',
  buttonTarget: '_self',
  btnClassName: '',
}
