import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'

import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const HeroSection = () => {
  const { title, description, image } = useAppData('hero', true)

  const classes = useStyles({ background: image?.src })()

  return (
    <div className={classes.root}>
      <div className={classes.contentContainer}>
        {title?.value && (
          <InjectHTML
            tagType="h1"
            styleType="h1"
            color="tertiary"
            value={title?.value}
          />
        )}
        {description?.value && (
          <InjectHTML
            tagType="p"
            styleType="h5"
            color="tertiary"
            className={classes.description}
            value={description?.value}
          />
        )}
        <div
          style={{ backgroundImage: image?.src }}
          className={classes.mobileHeroImg}
        ></div>
      </div>
    </div>
  )
}

const useStyles = ({ background }: any) =>
  makeStyles(({ breakpoints }) => ({
    root: { background: colors.main.dark },
    contentContainer: {
      ...COMPONENT_WRAPPER,
      padding: '10rem 0 7rem 1rem',
      [breakpoints.down('sm')]: {
        padding: '4rem 1rem 21.25rem 1rem',
      },
      position: 'relative',
    },
    description: {
      marginTop: '1rem',
      [breakpoints.down('xs')]: {
        '& br': { display: 'none' },
      },
    },
    learnMoreBtn: {
      display: 'block',
      width: '17.5rem',
      marginTop: '2rem',
      [breakpoints.down('xs')]: {
        margin: 'auto',
        width: '100%',
        marginTop: '1rem',
      },
    },
    mobileHeroImg: {
      position: 'absolute',
      right: 32,
      top: 86,
      backgroundImage: `url(${background})`,
      height: 836,
      width: 418,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      [breakpoints.down('sm')]: {
        left: '50%',
        top: '150px',
        transform: 'translateX(-50%) scale(0.45)',
        right: 'unset',
      },
    },
  }))

export default HeroSection
