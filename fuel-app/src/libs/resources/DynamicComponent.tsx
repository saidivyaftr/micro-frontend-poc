import HeroBanner from './HeroSection'
import FrontierInfo from './FrontierInfo'
import FrontierEero from './FrontierEero'
import SpeedCallOut from './SpeedCallout'
import ExtraSpeed from './ExtraSpeed'
import FrontierReputation from './FrontierReputation'
import QuickAccess from './QuickAccess'
import ProsAndCons from './ProsAndCons'
import CorporatePolicies from './CorporatePolicies'
import { RichText } from '@/shared-ui/components'
import CompareTable from './CompareTable'
import HeroStripeBanner from './HeroComponent'
import FAQ from './FAQ'
import MobileStripesLoop from './MobileStripesLoop'
import BreadcrumbNav from './BreadcrumbNav'
import PageEndBanner from './PageEndBanner'
import TileSwiper from './TileSwiper'
import PageEndChatbotBanner from './PageEndChatbotBanner'
type ComponentsProps = {
  [key: string]: any
}

const Components: ComponentsProps = {
  HeroBanner,
  HeroStripeBanner,
  frontierInfo: FrontierInfo,
  frontierEroo: FrontierEero,
  quickInfo: SpeedCallOut,
  quickAccess: QuickAccess,
  reputationData: FrontierReputation,
  richText: RichText,
  extraSpeedData: ExtraSpeed,
  FAQ,
  ProsAndCons,
  comparisonTableUpdated: CompareTable,
  mobileStripesLoop: MobileStripesLoop,
  mediaTextBlocks: MobileStripesLoop,
  CorporatePolicies,
  breadcrumb: BreadcrumbNav,
  pageendbanner: PageEndBanner,
  TileSwiper: TileSwiper,
  pageendchatbotbanner: PageEndChatbotBanner,
}

type DynamicComponentProps = {
  data: any
}
const DynamicComponent = ({ data }: DynamicComponentProps) => {
  // check if component is defined above
  if (Components[data?.componentName]) {
    const Component = Components[data?.componentName]
    return <Component data={data?.fields?.data?.datasource} />
  }
  // fallback if the component doesn't exist
  return null
}

export default DynamicComponent
