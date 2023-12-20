import { makeStyles } from '@material-ui/core'
import { Typography, Hero } from '@/shared-ui/components'
import YextSnippet from 'src/utils/yext'
import { Magnify, ChevronRight } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { useUpdateSearchPlaceholder, useAppData } from 'src/hooks'
import {
  PP_OBJECT_SANS,
  PP_OBJECT_SANS_BOLD,
} from 'src/constants/fontFamilyNames'
const DOTCOM_URL = process.env.DOTCOM_URL || ''

const HeroSection = () => {
  const classes = useStyles()
  useUpdateSearchPlaceholder()
  const heroBannerData = useAppData('heroBanner', true)
  if (Object.keys(heroBannerData)?.length === 0) {
    return null
  }
  const { firstTitle, secondTitle, backgroundImage, mobileBackgroundImage } =
    heroBannerData

  const handleClick = (e: any) => {
    e.preventDefault()
    const element: any = document.getElementById(
      'yxt-SearchBar-input--yext-help-center',
    )
    if (!element?.value) return
    window.location.href = `${DOTCOM_URL}search?query=${element.value}`
  }

  return (
    <Hero
      backgroundColor="gravity"
      bkgImgClassName={classes.heroBkgImg}
      backgroundImage={backgroundImage?.src}
      mobileBackgroundImage={mobileBackgroundImage?.src}
      removeStripes={false}
      className={classes.heroStripes}
      stripeStyles={{
        height: 18,
        marginBottom: 12,
      }}
      content={
        <div>
          <Typography
            color="secondary"
            fontType="boldFont"
            className={classes.headingTitle}
          >
            {firstTitle?.value}
          </Typography>
          <Typography tagType="h1" styleType="h2" color="tertiary">
            {secondTitle?.value}
          </Typography>
          <div className={classes.searchContainer}>
            <Magnify />
            <div className={classes.yextSearchWrapper}>
              <div className="yext-search-container-help-center"></div>
              <YextSnippet />
            </div>
            <ChevronRight onClick={handleClick} />
          </div>
        </div>
      }
    />
  )
}
const useStyles = makeStyles(({ breakpoints }: { breakpoints: any }) => ({
  yextSearchWrapper: {
    width: 'calc(98% - 30px)',
    position: 'relative',
    '& .yext-search-container-help-center': {
      height: 60,
    },
    '& .yext-search-container-help-center input': {
      width: '100%',
      borderRadius: 30,
      flex: 1,
      height: 60,
      border: 0,
      outline: 'none',
      fontSize: '18px',
      fontFamily: PP_OBJECT_SANS_BOLD,
      [breakpoints.down('xs')]: {
        fontSize: '16px',
      },
    },
    '& .yxt-SearchBar-container': {
      border: '0 !important',
      background: 'transparent',
      zIndex: 99,
      boxShadow: 'none !important',
      '&:hover': {
        boxShadow: 'none !important',
      },
    },
    '& .yxt-SearchBar-input': {
      paddingLeft: 10,
      padding: 0,
    },
    '& .yxt-SearchBar-form': {
      '& button': {
        display: 'none',
      },
    },
    '& .yxt-AutoComplete-option': {
      fontFamily: PP_OBJECT_SANS,
      padding: '6px 16px',
    },
    '& .yxt-AutoComplete-wrapper': {
      backgroundColor: 'transparent',
    },
    '& .yxt-AutoComplete': {
      backgroundColor: colors.main.white,
      border: `1px solid ${colors.main.borderGrey}`,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      borderRadius: 16,
      borderTop: 0,
      marginTop: 6,
      paddingTop: 10,
      '&::before': { display: 'none' },
    },
  },
  headingTitle: {
    lineHeight: 1.1,
    marginBottom: '.625rem',
    maxWidth: '700px',
    paddingTop: '25px',
    [breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  heroStripes: {
    overflow: 'unset',
  },
  heroBkgImg: {
    maxHeight: '25rem !important',
    minHeight: '25rem !important',
    backgroundPosition: 'center !important',
    [breakpoints.down(1024)]: {
      backgroundPosition: 'center right 20% !important',
    },
    [breakpoints.down('xs')]: {
      minHeight: 'unset !important',
      padding: '64px 0 80px',
    },
  },
  searchContainer: {
    maxWidth: 700,
    marginTop: 36,
    marginRight: 16,
    borderRadius: 30,
    display: 'flex',
    padding: '0px 16px',
    paddingLeft: 24,
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.main.white,
    [breakpoints.down('xs')]: {
      marginTop: 8,
    },
    '& svg:first-child': {
      height: 32,
      width: 19,
      '& path': {
        fill: colors.main.grayOpacity50,
      },
    },
    '& svg:last-child': {
      height: 32,
      width: 19,
      '& path': {
        fill: 'none',
        cursor: 'pointer',
      },
      '&:hover': {
        '& path': {
          stroke: colors.main.brightRed,
        },
      },
    },
  },
}))

export default HeroSection
