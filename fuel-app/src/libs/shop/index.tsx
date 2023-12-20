import { InternetPlansTable } from 'src/components/InternetPlansTable'
import { TwoColumnLayoutWithImage } from 'src/components/TwoColumnLayoutWithImage'
import { YTVSection } from 'src/components/YTVSection'
import { SwiperContent } from 'src/components/SwiperContent'
import { Testimonials } from 'src/components/Testimonials'
import TermsModal from 'src/components/TermsModal'
import CheckAvailabilityInfo from './components/CheckAvailabilityInfo'
import FrontierEero from './components/FrontierEero'
import HeroSection from './components/HeroSection'
import HeroComponent from './components/HeroComponent'
import SwiperContentWithArrow from './components/SwiperContent'
import WhyFiber2Gig from './components/WhyFiber2Gig'
import AwardCarousel from 'src/components/AwardCarousel'
import UncableYourself from './components/UncableYourself'
import InternetCredit from './components/InternetCredit'
import FiberInternetFAQ from './components/FiberInternetFAQ'
import Gig5MaxPerformance from './components/Gig5MaxPerformance'
import GetMoreValue from './components/GetMoreValue'
import SpecialAboutFiber from './components/SpecialAboutFiber'
import YTVSundayTicket from './components/YTVSundayTicket'
import YTVThreeTiles from './components/YTVThreeTiles'
import YTVBetter from './components/YTVBetter'
import YTVStreaming from './components/YTVStreaming'
import FrontierYTV from './components/FrontierYTV'
import StreamingOptions from './components/StreamingOptions'
import HomeShieldElite from './components/HomeShieldElite'
import PremiumTechPro from './components/PremiumTechPro'
import HomeWiFi from './components/HomeWiFi'
import EeroSecure from './components/EeroSecure'
import BetterGaming from './components/BetterGaming'
import WhyFrontier from './components/WhyFrontier'
import ShopBanner from './components/ShopBanner'
import IdentityProtection from './components/IdentityProtection'
import BreadCrumb from './components/BreadCrumb'
import InternetDetails from './components/InternetDetails'
import FiberOfferings from './components/FiberOfferings'
type ComponentsProps = {
  [key: string]: any
}

const Components: ComponentsProps = {
  heroImage: HeroSection,
  hero: HeroComponent,
  CheckAvailability: CheckAvailabilityInfo,
  carousel: SwiperContentWithArrow,
  speedAdvantagesCards: WhyFiber2Gig,
  awardCarousel: AwardCarousel,
  frontierEroo: FrontierEero,
  comparisonTableUpdated: InternetPlansTable,
  twoColumnLayoutGlobal: TwoColumnLayoutWithImage,
  ytvSection: YTVSection,
  tabsWithImageGlobal: SwiperContent,
  SwiperContent: BetterGaming,
  UncableYourself: UncableYourself,
  InternetCredit: InternetCredit,
  testimonials: Testimonials,
  faqList: FiberInternetFAQ,
  Gig5MaxPerformance: Gig5MaxPerformance,
  getMoreValue: GetMoreValue,
  specialAboutFiber: SpecialAboutFiber,
  YTVSundayTicket: YTVSundayTicket,
  YTVThreeTiles: YTVThreeTiles,
  YTVBetter: YTVBetter,
  YTVStreaming: YTVStreaming,
  FrontierYTV: FrontierYTV,
  streamingOptions: StreamingOptions,
  TermsModal: TermsModal,
  homeShieldElite: HomeShieldElite,
  contentBlockWithPrice: PremiumTechPro,
  homewifi: HomeWiFi,
  EeroSecure: EeroSecure,
  whyFrontier: WhyFrontier,
  shopBanner: ShopBanner,
  identityProtection: IdentityProtection,
  breadCrumb: BreadCrumb,
  internetDetails: InternetDetails,
  fiberOfferings: FiberOfferings,
}
import { useWindowDimensions } from 'src/hooks'
import { useMemo } from 'react'
type DynamicComponentProps = {
  data: any
}
const DynamicComponent = ({ data }: DynamicComponentProps) => {
  const Component = Components[data?.componentName]
  const datasource = data?.fields?.data?.datasource || {}
  const {
    paddingTopMobile,
    paddingBottomMobile,
    paddingTopDesktop,
    paddingBottomDesktop,
  } = datasource
  const mobileDevice = 768
  const { width } = useWindowDimensions()
  const isMobile = width <= mobileDevice
  const styles = useMemo(() => {
    if (isMobile) {
      return {
        ...(paddingTopMobile?.value && { paddingTop: paddingTopMobile?.value }),
        ...(paddingBottomMobile?.value && {
          paddingBottom: paddingBottomMobile?.value,
        }),
      }
    } else {
      return {
        ...(paddingTopDesktop?.value && {
          paddingTop: paddingTopDesktop?.value,
        }),
        ...(paddingBottomDesktop?.value && {
          paddingBottom: paddingBottomDesktop?.value,
        }),
      }
    }
  }, [isMobile])

  // check if component is defined above
  if (Components[data?.componentName]) {
    return (
      <>
        <Component styles={styles} />
      </>
    )
  }
  // fallback if the component doesn't exist
  return null
}

export default DynamicComponent
