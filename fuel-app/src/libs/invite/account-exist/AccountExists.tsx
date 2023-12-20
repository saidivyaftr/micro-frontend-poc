import { makeStyles } from '@material-ui/core/styles'
import { COMPONENT_WRAPPER, CTA_BUTTON } from 'src/constants'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import useAppData from '@/shared-ui/hooks/useAppData'

const AccountExists = () => {
  const { title, description, buttonLabel } = useAppData(
    'textBlockwithButton',
    true,
  )
  const classes = useStyles()
  const handleSubmit = () => {
    window.location.href = '/login'
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <Typography styleType="h4" tagType="h1" className={classes.header}>
          {title?.value}
        </Typography>
        <InjectHTML
          addAnchorStyles
          styleType="p2"
          value={description?.value}
          className={classes.description}
        />
        <div>
          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            className={classes.btn}
            text={buttonLabel?.value}
            triggerEvent={true}
            eventObj={{
              events: 'event14',
              eVar14: `${CTA_BUTTON}:sign-in`,
            }}
          />
        </div>
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
    whiteSpace: 'nowrap',
    [breakpoints.down('xs')]: {
      whiteSpace: 'pre-wrap',
    },
  },

  section: {
    padding: '80px 10px 25px 0px',
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: '75%',
    justifyContent: 'flex-start',
    gap: '2rem',
    [breakpoints.down('xs')]: {
      width: '100%',
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
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default AccountExists
