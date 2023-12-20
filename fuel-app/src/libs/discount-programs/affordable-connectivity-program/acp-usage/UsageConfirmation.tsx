import { makeStyles } from '@material-ui/core'
import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { certifyInternetUsage } from 'src/redux/slicers/acpUsage'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const UsageConfirmation = () => {
  const styles = useStyles()

  const { title, description, btnText } = useAppData('UsageConfirmation', true)

  const dispatch = useDispatch()

  const { query } = useRouter()
  const { a: accountUuid, b: contact, c: contactMethod } = query

  const onConfirm = async () => {
    dispatch(
      certifyInternetUsage({
        accountUuid: accountUuid,
        usageDateTime: new Date().toISOString().split('.')[0] + 'Z',
        contactMethod: contactMethod,
        emailAddress: contactMethod == 'email' ? contact : undefined,
        mobileNumber: contactMethod == 'sms' ? contact : undefined,
      }),
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.innerWrapper}>
        {title?.value && (
          <Typography
            styleType="h4"
            tagType="h4"
            fontType="boldFont"
            className={styles.title}
          >
            {title?.value}
          </Typography>
        )}
        {description?.value && (
          <div className={styles.descriptionContainer}>
            <InjectHTML
              tagType="p"
              styleType="p3"
              value={description?.value}
              className={styles.description}
            />
          </div>
        )}

        <Button
          text={btnText?.value}
          type="submit"
          onClick={onConfirm}
          className={styles.button}
          variant="primary"
          disabled={!(accountUuid && contact && contactMethod)}
          triggerEvent={true}
          eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
          interactionType={SITE_INTERACTION}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: { background: colors.main.newBackgroundGray },
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    padding: '5rem 1rem',
    maxWidth: '52rem',
    margin: 'auto',
  },
  button: {
    width: 265,
    padding: '0rem',
    marginTop: '3rem',
    marginBottom: '3rem',
    [breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '2rem',
    },
  },
  descriptionContainer: {
    background: colors.main.white,
    marginTop: '2rem',
    padding: '1.5rem',
    border: `1px solid ${colors.main.borderGrey}`,
    borderRadius: '2rem',
  },
  title: {
    textTransform: 'none',
    marginBottom: 16,
  },
  preTitle: {
    textTransform: 'uppercase',
    fontFamily: 'PP_OBJECT_SANS_BOLD',
  },
  description: {
    [breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.125rem',
    },
    margin: '0',
  },
}))

export default UsageConfirmation
