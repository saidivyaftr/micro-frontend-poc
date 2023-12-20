import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  Map,
  Sticky,
  Hero,
  ButtonLinks,
  UsefulInformation,
  Information,
  UgentAlerts,
  HelpfulLinks,
  GovernmentAgency,
} from '../../../libs/california-emergency'
interface PageProps {
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  return (
    <>
      <MainLayout {...props}>
        <Hero />
        <ButtonLinks />
        <UsefulInformation />
        <Information />
        <UgentAlerts />
        <Map />
        <HelpfulLinks />
        <GovernmentAgency />
      </MainLayout>
      <Sticky />
    </>
  )
}

export const getStaticProps = customStaticProps(
  '/resources/california-emergency',
)

export default SSR
