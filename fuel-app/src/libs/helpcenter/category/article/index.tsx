import QuickAccess from './components/QuickAccess'
import faq from './components/faq'
import BreadCrumbAndSearchBar from './components/BreadCrumbAndSearchBar'
import PayTypes from './components/PayTypes'
import ActionCard from './components/ActionCard'
import OneTimePayment from './components/OneTimePayment'
import BodyComponent1 from './components/BodyComponent1'
import BodyComponent2 from './components/BodyComponent2'
import BodyComponent3 from './components/BodyComponent3'
import SuggestedArticles from './components/SuggestedArticles'
import Heading from './components/Heading'
import VideoComponent from './components/VideoComponent'
import ServiceOrderCheck from './components/ServiceOrderCheck'
import SocialMedia from './components/SocialMedia'
type ComponentsProps = {
  [key: string]: any
}

const Components: ComponentsProps = {
  jumpLinks: QuickAccess,
  social_media_links: SocialMedia,
  breadCrumb: BreadCrumbAndSearchBar,
  heading: Heading,
  video: VideoComponent,
  actionCard: ActionCard,
  oneTimePayment: OneTimePayment,
  payTypes: PayTypes,
  bodyComponent1: BodyComponent1,
  bodyComponent2: BodyComponent2,
  bodyComponent3: BodyComponent3,
  accordion: faq,
  suggestedArticles: SuggestedArticles,
  serviceOrderCheck: ServiceOrderCheck,
}

type DynamicComponentProps = {
  data: any
}
const DynamicArticleComponent = ({ data }: DynamicComponentProps) => {
  // check if component is defined above
  if (Components[data?.componentName]) {
    const Component = Components[data?.componentName]
    return (
      <Component
        data={data?.fields?.data?.datasource}
        componentName="article"
      />
    )
  }
  // fallback if the component doesn't exist
  return null
}

export default DynamicArticleComponent
