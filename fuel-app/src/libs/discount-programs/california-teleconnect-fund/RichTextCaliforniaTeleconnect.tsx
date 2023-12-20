import { RichText } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'

const RichTextCaliforniaTeleconnect = () => {
  const content = useAppData('richText', true)

  return (
    <div>
      <RichText data={content} />
    </div>
  )
}

export default RichTextCaliforniaTeleconnect
