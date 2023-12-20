import { RichText } from '@/shared-ui/components'
import BreadcrumbNav from './BreadcrumbNav'
import Hero from './Hero'

type ComponentsProps = {
  [key: string]: any
}

const Components: ComponentsProps = {
  Hero: Hero,
  breadcrumb: BreadcrumbNav,
  richText: RichText,
}

type DynamicComponentProps = {
  data: any
}
const DynamicLifelineCityComponent = ({ data }: DynamicComponentProps) => {
  // check if component is defined above
  if (Components[data?.componentName]) {
    const Component = Components[data?.componentName]
    return <Component data={data?.fields?.data?.datasource} />
  }
  // fallback if the component doesn't exist
  return null
}

export default DynamicLifelineCityComponent
