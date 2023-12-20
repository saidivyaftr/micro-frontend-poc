import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { ErrorCheckMark, ThanksCheckMark } from '@/shared-ui/react-icons'

interface ThanksMessageProps {
  componentName: string
}

const InfoMessage = ({ componentName }: ThanksMessageProps) => {
  const classes = useStyles()
  const { statusTitle, contentVisibleFlag, iconName, statusContent } =
    useAppData(componentName, true)
  if (!statusTitle || !contentVisibleFlag || !iconName || !statusContent) {
    return null
  }

  return (
    <section className={classes.root}>
      <div className={classes.imgClass}>
        {iconName?.value === 'error' ? <ErrorCheckMark /> : <ThanksCheckMark />}
      </div>
      <Typography
        tagType="h3"
        styleType="h3"
        color="primary"
        className={classes.title}
      >
        {statusTitle?.value}
      </Typography>
      {contentVisibleFlag.value === true && (
        <InjectHTML
          className={classes.contentStyle}
          tagType="div"
          value={statusContent?.value}
        />
      )}
    </section>
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    padding: '5.313rem 5.5rem',
    flexDirection: 'column',
    alignItems: 'center',
    background: colors.main.newBackgroundGray,
    borderRadius: '2rem',
    margin: '8.125rem auto 5.625rem auto',
    [theme.breakpoints.down('sm')]: {
      padding: '3.125rem  1rem',
      margin: '4.063rem 1rem',
    },
  },
  imgClass: {
    width: '2.5rem',
    margin: '0px auto 1rem auto',
    [theme.breakpoints.down('sm')]: {
      width: '2.188rem',
    },
  },

  title: {
    letterSpacing: '-0.02em',
    textAlign: 'center',
    color: colors.main.dark,
    [theme.breakpoints.down('sm')]: {
      letterSpacing: '-0.01em',
    },
  },

  contentStyle: {
    '& a': {
      fontFamily: 'PP Object Sans Bold',
      textDecoration: 'underline',
      fontWeight: 600,
      '&:hover': { color: colors.main.brightRed },
    },
    fontSize: '1.13rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    paddingTop: '1rem',
    maxWidth: '35rem',
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      paddingTop: '1.8rem',
    },
  },
}))

export default InfoMessage
