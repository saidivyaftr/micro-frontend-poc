import colors from '@/shared-ui/colors'
import { Hero, InjectHTML, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import { useAppData, useChatState } from 'src/hooks'

const HeroSection: React.FC = () => {
  const classes = useStyles()
  const { setChatState } = useChatState()

  const { title, image, description, mobileImage, buttonText }: any =
    useAppData('hero', true)
  if (!title?.value) {
    return null
  }

  return (
    <div data-testid="hero-banner-section">
      <Hero
        backgroundColor="clarity"
        className={classes.heroBannerStyles}
        content={
          <div>
            <InjectHTML
              value={title?.value}
              className={classes.titleStyles}
              tagType="h1"
              styleType="h1"
            />
            <InjectHTML
              value={description?.value}
              className={classes.subTitle}
              tagType="div"
              styleType="h5"
            />
            {buttonText?.value && (
              <>
                <Button
                  type="button"
                  variant={'primary'}
                  text={buttonText?.value}
                  onClick={() => setChatState(true)}
                  className={classes.chat}
                />
              </>
            )}
          </div>
        }
        backgroundImage={image?.src}
        mobileBackgroundImage={mobileImage?.src}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  subTitle: {
    fontWeight: 700,
    margin: '24px 0px 32px 0px',
    [breakpoints.down('xs')]: {
      margin: '8px 0px 16px 0px',
    },
  },
  heroBannerStyles: {
    [breakpoints.down('xs')]: {
      padding: '48px 22px 0px 16px',
    },
    [breakpoints.down(430)]: {
      backgroundPosition: 'initial',
    },
  },
  chat: {
    maxWidth: 252,
    width: '100%',
    height: 50,
    [breakpoints.down('xs')]: {
      display: 'flex',
      maxWidth: '100%',
    },
  },
  titleStyles: {
    letterSpacing: '1px',
    fontFamily: PP_OBJECT_SANS_BOLD,
    textTransform: 'initial',
    '& span': {
      marginTop: 2,
      color: colors.main.brightRed,
    },
  },
}))

export default HeroSection
