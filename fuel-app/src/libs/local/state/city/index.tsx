import BenefitsFrontier from '../../components/BenefitsFrontier'
import CheckAvailabilityInfo from '../../components/CheckAvailabilityInfo'
import ComparisonTableUpdated from '../../components/ComparisonTableUpdated'
import FaqList from '../../components/FaqList'
import FastestInternet from '../../components/FastestInternet'
import FilterCities from '../../components/FilterCities'
import FrontierInternetServices from '../../components/FrontierInternetServices'
import HeroSection from '../../components/HeroSection'
import MovingToState from '../../components/MovingToState'
import StatesWeOperate from '../../components/StatesWeOperate'
import AwardCarousel from 'src/components/AwardCarousel'
import TrophyCaseInfo from '../../components/TrophyCaseInfo'

type ComponentsProps = {
  [key: string]: any
}

const Components: ComponentsProps = {
  heroBanner: HeroSection,
  CheckAvailabilityInfo: CheckAvailabilityInfo,
  FrontierInternetServices: FrontierInternetServices,
  trophyCase: TrophyCaseInfo,
  comparisonTableUpdated: ComparisonTableUpdated,
  awardCarousel: AwardCarousel,
  twoColumnLayoutGlobal: FastestInternet,
  benefitsFrontier: BenefitsFrontier,
  cityData: FilterCities,
  MovingToState: MovingToState,
  StatesWeOperateUpdated: StatesWeOperate,
  faqList: FaqList,
}

type DynamicComponentProps = {
  data: any
}
const DynamicCityComponent = ({ data }: DynamicComponentProps) => {
  // check if component is defined above
  if (Components[data?.componentName]) {
    const Component = Components[data?.componentName]
    return (
      <Component
        data={data?.fields?.data?.datasource}
        contextItem={data?.fields?.data?.contextItem}
        componentName="city"
      />
    )
  }
  // fallback if the component doesn't exist
  return null
}

export default DynamicCityComponent
