import { BlackHeader } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'

const Hero = () => {
  const { title } = useAppData('hero', true)

  return <BlackHeader title={title.value} />
}

export default Hero
