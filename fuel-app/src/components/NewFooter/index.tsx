import { useAppData } from 'src/hooks'
import { formatData } from './helper'
import { Footer } from '@/shared-ui/components'
// import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
// import { FOOTER_LINKS, SITE_INTERACTION } from 'src/constants'
interface NewFooterProps {
  data?: any
  legalData?: any
  miniFooter?: boolean
}
const NewFooter: React.FC<NewFooterProps> = ({
  data,
  legalData,
  miniFooter,
}: NewFooterProps): JSX.Element => {
  const item = useAppData('newFooter', true, data)

  const { description, nonProspectDescription } = useAppData(
    'LegalDescription',
    true,
    legalData,
  )

  const finalData = formatData(item, description, nonProspectDescription)
  const clickAnalytics = () => {
    // DTMClient.triggerEvent(
    //   {
    //     events: 'event14',
    //     eVar14: FOOTER_LINKS.replace('{NAME}', title.toLowerCase()),
    //   },
    //   'tl_o',
    //   SITE_INTERACTION,
    // )
  }
  return (
    <Footer
      {...finalData}
      onClickCallback={clickAnalytics}
      miniFooter={miniFooter}
    />
  )
}

export default NewFooter
