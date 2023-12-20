import { makeStyles } from '@material-ui/core'
import { Button, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER, SITE_INTERACTION } from 'src/constants'
import colors from '@/shared-ui/colors'
import { openChat } from 'src/utils/RenderChat'
import useAppData from '@/shared-ui/hooks/useAppData'
const InfoMessage = () => {
  const classes = useStyles()
  const { title, contactUs, description } = useAppData('infoModal', true)
  return (
    <div className={classes.root}>
      <InjectHTML
        tagType="h1"
        styleType="h4"
        className={classes.title}
        value={title?.value}
      />
      <InjectHTML tagType="p" styleType="p1" value={description?.value} />
      <Button
        className={classes.contactUs}
        type="button"
        onClick={openChat}
        variant="primary"
        text={contactUs?.value}
        buttonSize="large"
        triggerEvent={true}
        eventObj={{
          events: 'event14',
          eVar14: `frontier-id-disabled:${contactUs?.value
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
    '& span': {
      color: colors.main.brightRed,
    },
    [breakpoints.down('xs')]: {
      padding: '0px 16px',
      fontSize: '1.5rem',
      lineHeight: '32px',
    },
  },
  contactUs: {
    marginTop: '2rem',
  },
}))

export default InfoMessage
