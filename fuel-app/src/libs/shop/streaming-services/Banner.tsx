import { useAppData } from 'src/hooks'
import { Hero } from '@/shared-ui/components'

const Banner: React.FC = () => {
  const {
    field: { Banners },
  } = useAppData('HeroBanner', true)
  const { title, subTitle, image, mobileImage } = Banners?.[0]
  if (!title?.value) {
    return null
  }
  const splitTitle = title?.value?.split(' ')
  const firstTitle = splitTitle[0]
  const secondTitle = splitTitle.splice(1, splitTitle.length).join(' ')
  return (
    <Hero
      backgroundColor="gravity"
      title1={firstTitle}
      title2={secondTitle}
      subHeader={subTitle?.value}
      backgroundImage={image?.src}
      mobileBackgroundImage={mobileImage?.src}
    />
  )
}
export default Banner
