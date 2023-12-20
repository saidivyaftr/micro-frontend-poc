import { useAppData } from 'src/hooks'
const OrgSchema = () => {
  const content: any = useAppData('richTextContent', true) || {}
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: content?.script?.value }}
    />
  )
}
export default OrgSchema
