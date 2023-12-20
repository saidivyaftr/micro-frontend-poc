import { useAppData } from 'src/hooks'
import { Hero } from '@/shared-ui/components'

const Banner: React.FC = () => {
  const { firstTitle } = useAppData('heroBanner', true)
  return <Hero backgroundColor="gravity" title2={firstTitle?.value} />
}
export default Banner
