import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Typography } from '@/shared-ui/components'
import { MobileIcon } from '@/shared-ui/react-icons'
import useAppData from '@/shared-ui/hooks/useAppData'

const FrontierAppBanner = () => {
  const classes = useStyles()
  const { title, description, learnMoreBtnText, learnMoreUrl } = useAppData(
    'myFrontierAppBanner',
    true,
  )
  return (
    <div className={classes.root}>
      <div className={classes.innerWrapper}>
        <div>
          <MobileIcon />
        </div>
        <div className={classes.content}>
          <Typography
            styleType="p1"
            fontType="mediumFont"
            className={classes.title}
          >
            {title?.value}
          </Typography>
          <Typography
            styleType="p1"
            className={classes.description}
            color="tertiary"
          >
            {description?.value}
          </Typography>
          <a
            className={classes.learnMoreLink}
            target={'_blank'}
            href={learnMoreUrl?.value}
            rel="noreferrer"
            data-tid="app-banner-learn-more-link"
          >
            <Typography
              styleType="p1"
              className={classes.learnMoreBtnText}
              color="tertiary"
            >
              {learnMoreBtnText?.value}
            </Typography>
          </a>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.darkShadeBlue,
  },
  innerWrapper: {
    maxWidth: 1232,
    margin: 'auto',
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: colors.main.white,
    [breakpoints.down('xs')]: {
      padding: '16px 32px',
    },
  },
  content: {
    display: 'flex',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      width: '90%',
    },
    [breakpoints.down('md')]: {
      width: '95%',
    },
  },
  title: {
    color: colors.main.greenishBlue,
    paddingRight: 5,
  },
  description: {
    maxWidth: 'calc(100% - 422px)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginRight: 8,
    textOverflow: 'ellipsis',
    [breakpoints.down('xs')]: {
      maxWidth: 'unset',
    },
  },
  learnMoreLink: {
    textDecoration: 'underline',
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
  learnMoreBtnText: {
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
}))

export default FrontierAppBanner
