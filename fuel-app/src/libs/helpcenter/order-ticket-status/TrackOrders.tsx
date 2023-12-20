import { TrackOrders } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { makeStyles } from '@material-ui/core'

const TrackOrdersCard = () => {
  const classes = useStyles()
  const { title, imgSrc, subTitle, points, appStoreLink, playStoreLink } =
    useAppData('techOnTheWay', true)

  const filteredPoints = points?.targetItems.map(
    (point: any) => point?.field?.value,
  )
  return (
    <div id="myfrontier-app-banner">
      <TrackOrders
        points={filteredPoints}
        title={title?.value}
        subTitle={subTitle?.value}
        imgSrc={{
          alt: imgSrc?.alt,
          value: imgSrc?.src,
        }}
        playStoreUrl={playStoreLink?.value}
        appStoreUrl={appStoreLink?.value}
        wrapperClassName={classes.wrapper}
        showMobileQRCode={false}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    padding: '2rem 7.5rem 2rem 7.5rem',
    background: colors.main.grey,
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem 2rem 1rem',
    },
  },
}))

export default TrackOrdersCard
