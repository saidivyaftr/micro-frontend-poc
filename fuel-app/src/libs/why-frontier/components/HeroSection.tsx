import { useAppData } from 'src/hooks'
import { Hero } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { ZOOMED_OUT_MAX_WIDTH } from 'src/constants'

const HeroSection: React.FC = () => {
  const { title, description, image, mobileImage } =
    useAppData('hero', true) || {}
  const [firstTitle = '', firstTitle2 = '', ...secondTitle] =
    title?.value.split(' ') || []
  const classes = useStyles({
    background: image?.src,
    mobileBackground: mobileImage?.src,
  })()
  return (
    <div className={classes.rootBackground}>
      <div className={clx(classes.root)}>
        <Hero
          backgroundColor="gravity"
          title1={`${firstTitle} <br> ${firstTitle2}`}
          title2={secondTitle?.join(' ') || ''}
          subHeader={description?.value}
          className={clx('hero', classes.hero)}
        />
      </div>
    </div>
  )
}

const useStyles = ({ background, mobileBackground }: any) =>
  makeStyles(({ breakpoints }) => ({
    rootBackground: {
      backgroundColor: colors.main.dark,
    },
    root: {
      maxWidth: ZOOMED_OUT_MAX_WIDTH,
      margin: 'auto',
      background: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
      backgroundSize: 'cover',
      minHeight: '37.5rem',
      [breakpoints.down('md')]: {
        backgroundPosition: '70%',
        backgroundSize: 'cover',
      },
      [breakpoints.down('xs')]: {
        paddingBottom: `30vh`,
        background: `url(${mobileBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
        backgroundPositionX: 'center',
      },
    },
    hero: {
      background: 'transparent',
      [breakpoints.down('sm')]: {
        display: 'block',
      },
      [breakpoints.down('xs')]: {
        '& p': {
          fontSize: '1.125rem',
        },
      },
    },
  }))

export default HeroSection
