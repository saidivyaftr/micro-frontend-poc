import ACPSaveComparison from './ACPSaveComparison'
import ApplyACP from './ApplyACP'
import BreadcrumbNav from './BreadcrumbNav'
import FrontierLifeLine from './FrontierLifeLine'
import GroupFaqACP from './GroupFaqACP'
import HeroSection from './HeroSectionACP'
import WhatsACP from './WhatsACP'

type ComponentsProps = {
  [key: string]: any
}

const Components: ComponentsProps = {
  HeroACP: HeroSection,
  breadcrumb: BreadcrumbNav,
  WhatsACP: WhatsACP,
  ApplyACP: ApplyACP,
  ACPSaveComparison: ACPSaveComparison,
  FrontierLifeLine: FrontierLifeLine,
  faqGroup: GroupFaqACP,
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
