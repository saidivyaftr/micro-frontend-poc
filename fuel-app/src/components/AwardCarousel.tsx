import { AwardCarousel as AwardCarouselComponent } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { formatAwardCarouselData } from 'src/utils/formatData'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
const AwardCarousel = ({ data, styles }: any) => {
  const classes = useStyles()
  const componentData = useAppData('awardCarousel', true)
  const finalData = data ?? componentData

  if (Object.keys(finalData || {})?.length === 0) {
    return null
  }
  const formattedData = formatAwardCarouselData(finalData)
  return (
    <div className={classes.container}>
      <AwardCarouselComponent
        {...formattedData}
        cardContentClassName={classes.cardContentClassName}
        contentStyles={styles}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  cardContentClassName: {
    '& a:hover': {
      color: `${colors.main.brightRed} !important`,
    },
  },
  container: {
    '& .swiper-pagination': {
      position: 'absolute',
      bottom: 50,
    },
  },
}))

export default AwardCarousel
