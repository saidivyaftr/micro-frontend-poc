import customStaticProps from 'src/utils/appData'
import MainLayout from '@/shared-ui/layouts/main'
import {
  Hero,
  AvailabilitySection,
  SwiperContent,
  SpecialAboutFiber,
  Referals,
  FrontierFiberPlan,
  SpreadTheWord,
} from 'src/libs/why-frontier/why-fiber-internet/fiber-expansion'
import FAQ from 'src/components/FAQ'
import { Testimonials } from 'src/components/Testimonials'
import { usePageLoadEvents } from 'src/hooks'
import {
  FIBER_EXPANSION,
  VISITOR,
  UNVERIFIED_SERVICE_AREA,
} from 'src/constants'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from 'src/redux/types'
import { InternetPlansTable } from 'src/components/InternetPlansTable'
import AwardCarousel from 'src/components/AwardCarousel'
import { useRouter } from 'next/router'
import { bgaSlice } from 'src/redux/slicers'
import { useIsLoadingFromApp } from 'src/hooks'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function SSR(props: PageProps): JSX.Element {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: false,
    eventData: {
      pageName: FIBER_EXPANSION,
      eVar22: VISITOR,
      eVar49: UNVERIFIED_SERVICE_AREA,
    },
  })
  const isFromSMB = useIsLoadingFromApp()
  const router = useRouter()
  const { e, c } = router.query
  const dispatch = useDispatch()
  const { step, scenario } = useSelector((state: State) => state.bga) || {}
  const [isPAL, setIsPAL] = useState(false)

  const renderContent = () => {
    switch (step) {
      case 'fiber_is_available':
        return <FrontierFiberPlan />
      default:
        return <SwiperContent />
    }
  }

  useEffect(() => {
    dispatch(
      bgaSlice.actions.setEnviroment({
        environment: e as string,
        controlNumber: c as string,
      }),
    )
  }, [router.isReady])

  useEffect(() => {
    if (scenario.includes('PAL_NEEDED')) setIsPAL(true)
    else setIsPAL(false)
  }, [scenario])

  return (
    <MainLayout hideHeader={isFromSMB} hideFooter={isFromSMB} {...props}>
      <Hero />
      <AvailabilitySection />
      {isPAL && <SpreadTheWord />}
      <AwardCarousel />
      {renderContent()}
      <SpecialAboutFiber />
      <Referals />
      <InternetPlansTable />
      <Testimonials />
      <FAQ page="why-frontier/why-fiber-internet/fiber-expansion" />
    </MainLayout>
  )
}
export const getStaticProps = customStaticProps(
  '/why-frontier/why-fiber-internet/fiber-expansion',
)

export default SSR
