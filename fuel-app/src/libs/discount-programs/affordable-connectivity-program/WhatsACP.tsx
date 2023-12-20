import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const WhatsACP = () => {
  const classes = useStyles()

  const { heading, content }: any = useAppData('WhatsACP', true)

  return (
    <div className={classes.wrapper}>
      <div className={classes.flexer}>
        {heading?.value && (
          <Typography
            tagType="h2"
            styleType="h3"
            fontType="boldFont"
            className={classes.headingWrapper}
          >
            {heading?.value}
          </Typography>
        )}
        {content?.value && (
          <Typography
            tagType="p"
            styleType="p1"
            className={classes.contentWrapper}
          >
            {content?.value}
          </Typography>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
  },
  flexer: {
    margin: '5rem auto',
    [breakpoints.down('sm')]: {
      margin: '4rem auto',
    },
    display: 'flex',
    gap: '1.25rem',
    '& p': {
      margin: 0,
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexBasis: 'auto',
      gap: '1rem',
    },
  },
  headingWrapper: {
    letterSpacing: '-0.02em',
    order: 1,
    flexGrow: 0,
    [breakpoints.down('sm')]: {
      letterSpacing: '-0.01em',
      alignSelf: 'stretch',
    },
  },
  contentWrapper: {
    order: 2,
    flexGrow: 1,
    flexBasis: '85%',
    marginTop: 0,
    [breakpoints.down('sm')]: {
      alignSelf: 'stretch',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
}))

export default WhatsACP
