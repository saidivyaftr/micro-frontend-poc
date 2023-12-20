import { InternetPlansTable } from 'src/components/InternetPlansTable'
import TrophyCase from 'src/components/TrophyCase'
import { Testimonials } from 'src/components/Testimonials'
import FAQ from 'src/components/FAQ'
import FiberInternetFAQ from './components/Faq'
import FiberImpact from './components/FiberImpact'
import FiberServices from './components/FiberServices'
import HeroSection from './components/HeroSection'
import OurPromise from './components/OurPromise'
import PreferToCall from './components/PreferToCall'
import ScheduleInstallationBanner from './components/ScheduleInstallationBanner'
import SpecialAboutFiber from './components/SpecialAboutFiber'
import WhatToExpect from './components/WhatToExpect'
import CallToUpgrade from './components/CallToUpgrade'
import HeroVideoSection from './components/HeroVideoSection'
import QuickAccess from './components/QuickAccess'
import SwiperContent from './components/SwiperContent'
import GamingBadge from './components/GamingBadge'
import InternetCredit from './components/InternetCredit'
import OurFrontierPromise from './components/OurFrontierPromise'
import WhyFiber from './components/WhyFiber'
import HeroBanner from './components/HeroBanner'
import WhyFrontierComponent from './components/WhyFrontierComponent'
import FiveGig from './components/FiveGig'
import FastInternetVideo from './components/FastInternetVideo'
import OurPastPresentFuture from './components/OurPastPresentFuture'
import FiberIsFuture from './components/FiberIsFuture'
import CheckAvailabilityInfo from './components/CheckAvailability'
import ImageBoxText from './components/ImageBoxText'
import HeroImage from './components/HeroImage'

type ComponentsProps = {
  [key: string]: any
}

const Components: ComponentsProps = {
  hero: HeroSection,
  HeroSection: HeroSection,
  heroBanner: HeroBanner,
  heroImage: HeroImage,
  whatToExpect: WhatToExpect,
  SpecialAboutFiber: SpecialAboutFiber,
  fiberImpact: FiberImpact,
  OurPromise: OurPromise,
  testimonials: Testimonials,
  PreferToCall: PreferToCall,
  scheduleCall: ScheduleInstallationBanner,
  fiberServices: FiberServices,
  comparisonTableUpdated: InternetPlansTable,
  callToUpgrade: CallToUpgrade,
  HeroVideoSection: HeroVideoSection,
  quickInfo: QuickAccess,
  trophyCase: TrophyCase,
  carouselWithPerks: SwiperContent,
  GamingBadge: GamingBadge,
  QualifyForACP: InternetCredit,
  ourFrontierPromise: OurFrontierPromise,
  whyFiber: WhyFiber,
  faqList: FAQ,
  FiberInternetFAQ: FiberInternetFAQ,
  whyFrontier: WhyFrontierComponent,
  tileWithBackgroundImage: FiveGig,
  FastInternetVideo: FastInternetVideo,
  ourPastPresentFuture: OurPastPresentFuture,
  fiberIsFuture: FiberIsFuture,
  CheckAvailability: CheckAvailabilityInfo,
  imageBoxData: ImageBoxText,
}

type DynamicComponentProps = {
  data: any
}
const WhyFrontierDynamicComponent = ({ data }: DynamicComponentProps) => {
  // check if component is defined above
  if (Components[data?.componentName]) {
    const Component = Components[data?.componentName]
    return (
      <Component
        data={data?.fields?.data?.datasource}
        contextItem={data?.fields?.data?.contextItem}
        componentName="shop"
      />
    )
  }
  // fallback if the component doesn't exist
  return null
}

export default WhyFrontierDynamicComponent
