import { TrackOrders } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'

// import {
//   SITE_INTERACTION,
//   WELCOME_APP_STORE_CLICK,
//   WELCOME_PLAY_STORE_CLICK,
// } from 'src/constants'
// import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const TrackOrdersCard = () => {
  console.log(useAppData('TechOnTheWay', true))
  const { title, imgSrc, subTitle, points, appStoreLink, playStoreLink } =
    useAppData('TechOnTheWay', true)
  const filteredPoints = points?.targetItems.map(
    (point: any) => point?.value?.value,
  )
  return (
    <>
      <TrackOrders
        points={filteredPoints}
        title={title.value}
        subTitle={subTitle.value}
        imgSrc={imgSrc}
        playStoreUrl={playStoreLink.value}
        appStoreUrl={appStoreLink.value}
      />
    </>
  )
}

export default TrackOrdersCard
