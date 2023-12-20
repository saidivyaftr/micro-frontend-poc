import { makeStyles } from '@material-ui/core/styles'
import { COMPONENT_WRAPPER } from 'src/constants'
import { InjectHTML } from '@/shared-ui/components'
import { useAppData } from '@/shared-ui/hooks/index'
import colors from '@/shared-ui/colors'

const InviteSent = () => {
  const { title, description } = useAppData('textBlockwithButton', true) || {}
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <InjectHTML
          styleType="h4"
          tagType="h1"
          value={title?.value}
          className={classes.header}
        />
        <InjectHTML
          addAnchorStyles
          styleType="p2"
          value={description?.value}
          className={classes.description}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
    marginBottom: 60,
  },

  header: {
    margin: '35px 10px 25px 0px',
    '& span': {
      color: colors.main.brightRed,
    },
  },

  section: {
    padding: '80px 10px 25px 0px',
    textAlign: 'center',
    margin: '0 auto',
    justifyContent: 'flex-start',
    gap: '2rem',
    [breakpoints.down('xs')]: {
      gap: '0',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '2rem 0',
    },
  },
  description: {
    maxWidth: 'auto',
    margin: 'auto',
    width: '80%',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },

  btn: {
    marginTop: 50,
    fontSize: '16px',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default InviteSent
