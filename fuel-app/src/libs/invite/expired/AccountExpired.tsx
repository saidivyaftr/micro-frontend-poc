import { makeStyles } from '@material-ui/core/styles'
import { COMPONENT_WRAPPER, SITE_ERROR, SITE_INTERACTION } from 'src/constants'
import { Button, InjectHTML } from '@/shared-ui/components'
import APIClient from '../../../api-client'
import { useAppData } from '@/shared-ui/hooks/index'
import colors from '@/shared-ui/colors'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { useState } from 'react'

const AccountExpired = () => {
  const { title, description, buttonLabel } = useAppData(
    'textBlockwithButton',
    true,
  )
  const [loading, setLoading] = useState<boolean>(false)
  const classes = useStyles()

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams(window.location.search)
      const getEmail: any = params.get('email')
      const payload = {
        email: getEmail,
      }
      const response = await APIClient.resendRegistrationEmail(payload)
      if (response) {
        setLoading(false)
        DTMClient.triggerEvent(
          { events: 'event14', eVar14: 'resend-activation-email-success' },
          'tl_o',
          SITE_INTERACTION,
        )
        window.location.href = '/invite/invite-sent'
      }
    } catch (error: any) {
      if (error?.response?.status === 201) {
        const icid = 'fid_existing_email'
        window.location.href = '/invite/account-exist?icid=' + icid
      }
      setLoading(false)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'ftr:Activate Ftr Id',
          eVar88: 'Failed to send registration email',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
  }

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
        <div>
          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmit}
            className={classes.btn}
            text={buttonLabel?.value}
            isBusy={loading}
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
    '& span': {
      color: colors.main.brightRed,
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
      maxWidth: '100%',
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

export default AccountExpired
