import { RichText } from '@/shared-ui/components'
import HeroSection from './HeroSection'
import FAQ from './FAQ'

type ComponentsProps = {
  [key: string]: any
}

const Components: ComponentsProps = {
  hero: HeroSection,
  richTextContent: RichText,
  FAQ: FAQ,
}

type DynamicComponentProps = {
  data: any
}
const DynamicComponent = ({ data }: DynamicComponentProps) => {
  if (Components[data?.componentName]) {
    const Component = Components[data?.componentName]
    return <Component data={data?.fields?.data?.datasource} />
  }

  return null
}

export default DynamicComponent
