import { Hero } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import useWindowDimensions from 'src/hooks/useWindowDimensions'

const HeroSection: React.FC = ({ data }: any) => {
  const classes = useStyles({ data })()
  const { width } = useWindowDimensions()

  const { title, backgroundImage, subTitle, backgroundMobileImage }: any = data
  if (!title?.value) {
    return null
  }
  const isMobile = width <= 768
  const splitTitle = title?.value?.split(' ')
  const firstTitle = splitTitle.splice(0, isMobile ? 2 : 1).join(' ')
  const secondTitle = splitTitle.join(' ')

  return (
    <div className={classes.root} data-testid="hero-banner-section">
      <Hero
        backgroundColor="clarity"
        title1={firstTitle}
        title2={secondTitle}
        title2Color={data?.title2Color?.targetItem?.color?.value}
        title1Color={data?.title1Color?.targetItem?.color?.value}
        subHeader={subTitle.value}
        subtitleClass={classes.subTitleColor}
        backgroundImage={backgroundImage?.src}
        mobileBackgroundImage={backgroundMobileImage?.src}
      />
    </div>
  )
}

const useStyles = ({ data }: any) =>
  makeStyles(({ breakpoints }) => ({
    subTitleColor: {
      color: data?.subTitleColor?.targetItem?.color?.value,
    },
    root: {
      [breakpoints.down('md')]: {
        marginTop: 0,
      },
      '& h1 div, p': {
        color: colors.main.dark,
      },
      [breakpoints.up('md')]: {
        '& p': {
          width: '50%',
        },
      },
    },
  }))

export default HeroSection
