import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import MainLayout from 'src/layouts/MainLayout'
import customStaticProps from 'src/utils/appData'
import { CUSTOMER, SERVICEABLE, YTTV_REGISTRATION_PAGE } from 'src/constants'
import { AppRoutes } from 'src/constants'

import {
  ActivationHero,
  OfferHero,
  GetStarted,
  BetterWithFrontier,
  YoutubeTvFAQ,
} from 'src/libs/youtubetv'
import { Testimonials } from 'src/components/Testimonials'
import { fetchOffers } from 'src/redux/slicers/yttv'
import { usePageLoadEvents } from 'src/hooks'
import { useSession } from 'next-auth/react'
interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
}

function ActivateYTTV(props: PageProps): JSX.Element {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const router = useRouter()
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    shouldTriggerInvoca: true,
    eventData: {
      pageName: YTTV_REGISTRATION_PAGE.replace('/{NAME}', ''),
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
    },
  })

  const { e, o, q, u } = router.query
  const accountUuid: string = u as string
  const order = {
    environmentCode: e,
    orderNumber: o,
    quoteId: q,
  }

  useEffect(() => {
    if (session) {
      dispatch(
        fetchOffers(accountUuid, {
          customerBearerToken: session?.token?.accessToken,
          order: order,
          vendor: 'YouTube_TV',
        }),
      )
    }
  }, [session])

  return (
    <MainLayout {...props}>
      {!session ? <ActivationHero activated={false} /> : <OfferHero />}
      {!session && <GetStarted />}
      {!session && <BetterWithFrontier />}
      <YoutubeTvFAQ />
      <Testimonials />
    </MainLayout>
  )
}

export const getStaticProps = customStaticProps(
  AppRoutes.YoutubeTvActivationPage,
)

export default ActivateYTTV
