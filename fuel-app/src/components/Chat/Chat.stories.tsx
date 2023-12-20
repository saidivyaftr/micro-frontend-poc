import { ComponentStory, ComponentMeta } from '@storybook/react'
import Chat from './Chat'
import { Provider } from 'react-redux'
import store from 'src/redux/Store'
import { appConfigSlice } from 'src/redux/slicers'
import { useEffect } from 'react'
store.dispatch(appConfigSlice.actions.setConfig({ isChatOpen: false }))
export default {
  title: 'Components/Chat',
  component: Chat,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Chat>

const Template: ComponentStory<typeof Chat> = () => {
  useEffect(() => {
    store.dispatch(appConfigSlice.actions.setConfig({ isChatOpen: false }))
  }, [])
  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  )
}

export const ChatExample = Template.bind({})
ChatExample.args = {}
