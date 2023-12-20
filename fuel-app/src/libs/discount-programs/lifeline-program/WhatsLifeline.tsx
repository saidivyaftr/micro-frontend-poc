import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
const WhatsLifeline = () => {
  const classes = useStyles()

  const { heading, content }: any = useAppData('WhatsLifeline', true)

  return (
    <div className={classes.wrapper}>
      <div className={classes.flexer}>
        {heading?.value && (
          <InjectHTML
            tagType="h2"
            styleType="h3"
            fontType="boldFont"
            className={classes.headingWrapper}
            value={heading?.value}
          />
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
    background: colors.main.grey,
    paddingTop: 80,
    paddingBottom: 80,
    [breakpoints.down('xs')]: {
      paddingTop: 32,
      paddingBottom: 32,
    },
  },
  flexer: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  headingWrapper: {
    maxWidth: 624,
    marginRight: 68,
  },
  contentWrapper: {
    maxWidth: 576,
    marginTop: 0,
    marginBottom: 0,
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      marginTop: 16,
    },
  },
}))

export default WhatsLifeline
