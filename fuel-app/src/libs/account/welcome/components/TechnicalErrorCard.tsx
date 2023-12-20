import colors from '@/shared-ui/colors'
import { Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import TechnicalErrorIcon from '@/shared-ui/react-icons/warning-outline'
import { useAppData } from 'src/hooks'

const TechnicalErrorCard = () => {
  const classes = useStyles()
  const { title, warning, message } =
    useAppData('TechnicalErrorData', true) || {}

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.cardWrapper}>
          <TechnicalErrorIcon />
          <Typography
            tagType="h3"
            styleType="h3"
            className={classes.title}
            testId="test-title"
          >
            {title?.value}
          </Typography>
          <div className={classes.description}>
            <Typography styleType="p1" testId="test-warning">
              {warning?.value}
            </Typography>
            <Typography styleType="p1" testId="test-message">
              {message?.value}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.newBackgroundGray,
    minHeight: 'calc(100vh - 180px)',
  },
  container: {
    padding: '5.25rem 1rem',
    [breakpoints.down('sm')]: {
      padding: '3rem 1rem',
    },
  },
  cardWrapper: {
    maxWidth: '62.5rem',
    margin: '0 auto',
    border: `1px solid ${colors.main.borderGrey}`,
    backgroundColor: colors.main.white,
    borderRadius: '2rem',
    padding: '5rem 7.5rem',
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      padding: '3rem 1rem',
    },
    '& svg': {
      width: 44,
      height: 44,
      '& path': {
        fill: colors.main.brightRed,
      },
    },
  },
  warningIcon: {
    width: '2.7rem',
    height: '2.7rem',
    '& path': {
      fill: colors.main.brightRed,
    },
  },
  title: {
    margin: '2rem 0',
  },
  description: {
    width: '25rem',
    margin: 'auto',
    '& span': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))
export default TechnicalErrorCard
