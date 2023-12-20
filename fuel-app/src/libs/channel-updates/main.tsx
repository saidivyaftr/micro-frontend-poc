import AffectedArea from './components/AffectedArea'
import TwoColumnLayoutComponent from './components/TwoColumnLayoutComponent'
import { HeroSection } from './components/HeroSection'
import YTVSection from './components/YTVSection'
import AwardCarouselWithCard from './components/AwardCarouselWithCard'

type ComponentsProps = {
  [key: string]: any
}

const Components: ComponentsProps = {
  heroBanner: HeroSection,
  affectedArea: AffectedArea,
  twoColumnLayout: TwoColumnLayoutComponent,
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
