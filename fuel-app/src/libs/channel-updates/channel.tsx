import { HeroSection } from './components/HeroSection'
import YTVSection from './components/YTVSection'
import AwardCarouselWithCard from './components/AwardCarouselWithCard'
import ChannelUpdatesHero from './components/ChannelUpdatesHero'
import AffectedChannels from './components/AffectedChannels'
import ProviderAndBills from './components/ProviderAndBills'

type ComponentsProps = {
  [key: string]: any
}

const Components: ComponentsProps = {
  heroBanner: HeroSection,
  heroChannelUpdatesData: ChannelUpdatesHero,
  affectedChannels: AffectedChannels,
  providerAndBillData: ProviderAndBills,
  awardCarousalWithCard: AwardCarouselWithCard,
  ytvSection: YTVSection,
}

type DynamicComponentProps = {
  data: any
}

const DynamicComponent = ({ data }: DynamicComponentProps) => {
  // check if component is defined above
  if (Components[data?.componentName]) {
    const Component = Components[data?.componentName]
    return (
      <Component
        data={data?.fields?.data?.datasource}
        contextItem={data?.fields?.data?.contextItem}
      />
    )
  }
  // fallback if the component doesn't exist
  return null
}

export default DynamicComponent
