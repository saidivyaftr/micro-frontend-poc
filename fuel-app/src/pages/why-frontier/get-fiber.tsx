import { makeStyles } from '@material-ui/core'
import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import { GET_FIBER_PAGE, VISITOR, UNVERIFIED_SERVICE_AREA } from 'src/constants'
import {
  FiberIsFuture,
  ImageBoxText,
  HeroSection,
} from 'src/libs/why-frontier/get-fiber'
import FAQ from 'src/components/FAQ'
import { GTagPageLoadEvent, GTAG_ID } from 'src/utils/gtag'
import { usePageLoadEvents } from 'src/hooks'
import { Testimonials } from 'src/components/Testimonials'
import CheckAvailability from 'src/libs/why-frontier/get-fiber/CheckAvailability'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  const classes = useStyle()
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: props?.success,
    eventData: {
      pageName: GET_FIBER_PAGE,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  return (
    <>
      <div className={classes.root}>
        <GTagPageLoadEvent id={GTAG_ID} />
        <MainLayout {...props}>
          <HeroSection />
          <CheckAvailability />
          <ImageBoxText />
          <FiberIsFuture />
          <Testimonials />
          <FAQ page="why-frontier/get-fiber" />
        </MainLayout>
      </div>
    </>
  )
}

const useStyle = makeStyles(({ breakpoints }) => ({
  root: {
    '& footer': {
      paddingBottom: 0,
      [breakpoints.down('md')]: {
        paddingBottom: 85,
      },
      [breakpoints.down('xs')]: {
        paddingBottom: 100,
        '& .chat-button': {
          bottom: 100,
        },
      },
    },
  },
}))
export const getStaticProps = customStaticProps('/why-frontier/get-fiber')

export default SSR
