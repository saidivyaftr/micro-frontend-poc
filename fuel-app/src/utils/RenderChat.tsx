import Chatbot from 'src/components/Chatbot'

const RenderChat = ({ chatType }: any) => {
  switch (chatType) {
    case 'APP':
      return <Chatbot />
    default:
      return null
  }
}

export const openChat = () => {
  try {
    const chat = document.getElementsByClassName(
      'minimized',
    ) as HTMLCollectionOf<HTMLElement>
    chat[0]?.click()
  } catch (e) {}
}

export default RenderChat
