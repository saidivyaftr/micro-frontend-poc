import { useMemo } from 'react'
import { useAppData } from 'src/hooks'
import { makeStyles } from '@material-ui/core/styles'
import router from 'next/router'
import {
  Typography,
  FourTiles,
  InjectHTML,
  Button,
} from '@/shared-ui/components'
import {
  COMPONENT_WRAPPER,
  PADDING,
  YTTV_CONFIRMATION_PAGE,
} from 'src/constants'
import colors from 'src/styles/theme/colors'
import { yttvCtaClickHandler } from '../shared/AnalyticsUtlis'
//import { useSession } from 'next-auth/react'
//import { useRouter } from 'next/router'

const ConfirmationHero: React.FC = () => {
  //const { data: session } = useSession()
  //const router = useRouter()
  //const { debug } = router.query

  const {
    heading,
    description,
    tiles,
    headingTwo,
    descriptionTwo,
    subContentTitle,
    subContentDesc,
    subContentButton,
    yttvUrl,
  }: any = useAppData('ConfirmationHero', true)

  const classes = useStyles({
    background: 'None',
  })()

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.rendered,
        icon: <InjectHTML value={item?.icon?.rendered} />,
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  const handleGoToYttv = (ctaName: string) => {
    yttvCtaClickHandler(YTTV_CONFIRMATION_PAGE, 'start-watching', ctaName)
    router.push(yttvUrl?.value)
  }

  // console.log('debug', debug)
  // useEffect(() => {
  //   if (!session && debug !== 'true') {
  //     router.push('/')
  //   }
  // }, [session, debug])

  return (
    <>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div className={classes.content}>
            <div className={classes.mainContent}>
              {heading?.value && (
                <Typography
                  tagType="h1"
                  styleType="h1"
                  fontType="boldFont"
                  color="secondary"
                  className={classes.heading}
                >
                  {heading?.value}
                </Typography>
              )}
              {description?.value && (
                <Typography
                  tagType="p"
                  styleType="h5"
                  color="tertiary"
                  fontType="regularFont"
                >
                  {description?.value}
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className={classes.subContentWrapper}>
          <div className={classes.subContent}>
            <div className={classes.subContentLeft}>
              <Typography tagType="h3" styleType="h3">
                {subContentTitle?.value}
              </Typography>
            </div>
            <div className={classes.subContentRight}>
              <Typography tagType="p" styleType="p1">
                {subContentDesc?.value}
              </Typography>
              <Button
                type="button"
                onClick={() => handleGoToYttv(subContentButton?.value)}
                variant="secondary"
                hoverVariant="secondary"
                text={subContentButton?.value}
                className={classes.getStartedButton}
              />
            </div>
          </div>
        </div>

        <div className={classes.wrapper}>
          <div className={classes.content}>
            <div>
              <FourTiles
                type="dark"
                textAlign="left"
                tiles={list}
                titleStyleType="h5"
                titleClassName={classes.title}
                descriptionClassName={classes.description}
                isClickable={false}
                cardClassName={classes.ConfirmationCard}
                iconClassName={classes.logo}
              />
            </div>

            <hr className={classes.hr} />

            <div className={classes.mainContent}>
              {headingTwo?.value && (
                <Typography
                  tagType="h3"
                  styleType="h5"
                  fontType="boldFont"
                  color="tertiary"
                  className={classes.heading}
                >
                  {headingTwo?.value}
                </Typography>
              )}
              {descriptionTwo?.rendered && (
                <Typography
                  tagType="p"
                  styleType="h5"
                  color="tertiary"
                  fontType="regularFont"
                >
                  <InjectHTML
                    className={classes.description2}
                    value={descriptionTwo?.rendered}
                  />
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const useStyles = ({ background }: any) =>
  makeStyles(({ breakpoints }) => ({
    title: {
      fontSize: '1.875rem',
    },
    description: {
      fontSize: '1.125rem',
      '& span:nth-child(3)': {
        '& span': {
          '&:hover': {
            color: colors.main.brightRed,
          },
        },
      },
      '& a': {
        '&:hover': {
          color: colors.main.brightRed,
        },
      },
    },
    logo: {
      '& div': {
        width: '33px',
        [breakpoints.down('xs')]: {
          '& svg': { width: '22px !important' },
        },
      },
    },
    root: {
      backgroundColor: colors.main.midnightExpress,
      background: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50vw',
      backgroundSize: '58vw',
      minHeight: '43.5rem',
      position: 'relative',
      [breakpoints.down('sm')]: {
        minHeight: '0',
        paddingBottom: '20px',
        backgroundPosition: 'calc(100%) 100%',
        backgroundSize: '105vw',
        backgroundPositionX: 60,
      },
      [breakpoints.down('xs')]: {
        backgroundSize: '104vw',
        backgroundPositionX: 30,
      },
      ['@media screen and (min-width: 1441px)']: {
        backgroundSize: 720,
        backgroundPositionY: 107,
      },
    },
    wrapper: {
      ...COMPONENT_WRAPPER,
      margin: 'auto',
      padding: `6rem ${PADDING}px`,
      [breakpoints.down('md')]: {
        padding: `3rem ${PADDING}px`,
      },
      [breakpoints.down('xs')]: {
        padding: `1.5rem ${PADDING}px`,
      },
    },
    heading: {
      textTransform: 'none',
      marginBottom: '0.5rem',
    },
    content: {
      [breakpoints.down('md')]: {
        margin: '1.75rem 0',
      },
    },
    mainContent: {
      position: 'relative',
      marginBottom: '2rem',
    },
    subContentWrapper: {
      backgroundColor: colors.main.greenishBlue,
    },
    subContent: {
      ...COMPONENT_WRAPPER,
      backgroundColor: colors.main.greenishBlue,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: '80px 16px',
      [breakpoints.down('md')]: {
        padding: `3rem 1rem`,
      },
      [breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: `3rem 1rem`,
      },
    },
    subContentLeft: {
      width: '35%',
      [breakpoints.down('sm')]: {
        width: '100%',
        marginBottom: '32px',
      },
    },
    subContentRight: {
      width: '65%',
      '& p': {
        margin: '0 0 2rem',
      },
      [breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    getStartedButton: {
      width: 'unset',
      display: 'inline-block',
      [breakpoints.down('xs')]: {
        width: '100%',
        fontSize: '18px',
        lineHeight: '24px',
      },
    },
    ConfirmationCard: {
      border: 'none',
    },
    hr: {
      border: '2px',
      borderStyle: 'solid',
      borderColor: '#96FFF5',
      marginTop: '40px',
      marginBottom: '54px',
    },
    description2: {
      color: 'white',
      marginTop: '20px',
      fontSize: '1.125rem',
      '& a': {
        '&:hover': {
          color: colors.main.brightRed,
        },
      },
    },
  }))

export default ConfirmationHero
