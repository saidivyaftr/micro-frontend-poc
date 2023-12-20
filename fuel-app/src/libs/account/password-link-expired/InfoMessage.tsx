import { makeStyles } from '@material-ui/core'
import { Button, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER, SITE_INTERACTION } from 'src/constants'
import colors from '@/shared-ui/colors'
import clsx from 'classnames'
import useAppData from '@/shared-ui/hooks/useAppData'
const InfoMessage = () => {
  const classes = useStyles()
  const { title, subTitle, description, resetPassword } = useAppData(
    'resetPassword',
    true,
  )
  return (
    <div className={classes.root}>
      <InjectHTML
        tagType="h1"
        styleType="h4"
        className={classes.title}
        value={title?.value}
      />
      <InjectHTML
        tagType="h1"
        styleType="h4"
        className={clsx(classes.title, classes.subTitle)}
        value={subTitle?.value}
      />
      <InjectHTML tagType="p" styleType="p1" value={description?.value} />
      <Button
        className={classes.contactUs}
        type="link"
        href={resetPassword?.link}
        variant="primary"
        text={resetPassword?.text}
        buttonSize="large"
        triggerEvent={true}
        eventObj={{
          events: 'event14',
          eVar14: `password-link-expired:${resetPassword?.text
            ?.toLowerCase()
            ?.replace(' ', '-')}`,
        }}
        interactionType={SITE_INTERACTION}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '48px 16px',
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      padding: 16,
    },
  },
  title: {
    fontSize: '2.25rem',
    marginBottom: '2rem',
    [breakpoints.down('xs')]: {
      padding: '0px 16px',
      fontSize: '1.5rem',
      lineHeight: '32px',
    },
  },
  subTitle: {
    color: colors.main.brightRed,
  },
  contactUs: {
    marginTop: '2rem',
  },
}))

export default InfoMessage
