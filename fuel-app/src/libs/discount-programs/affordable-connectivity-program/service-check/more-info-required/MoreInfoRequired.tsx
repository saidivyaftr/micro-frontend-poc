import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'

const MoreInfoRequired = () => {
  const { title, description, contactNumberText, contactNumberSrc } =
    useAppData('MoreInfoRequired', true)
  const classes = useStyles()
  if (!title) {
    return null
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapper}>
        {title?.value && (
          <InjectHTML
            tagType="h3"
            styleType="h3"
            value={title?.value}
            className={classes.title}
          />
        )}
        {description?.value && (
          <Typography
            tagType="p"
            styleType="h6"
            className={classes.description}
          >
            {description?.value}
          </Typography>
        )}
        {contactNumberText?.value && (
          <Button
            type="link"
            href={contactNumberSrc?.src}
            text={contactNumberText?.value}
            className={classes.callBtn}
          />
        )}
      </div>
    </div>
  )
}

export default MoreInfoRequired

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    marginBottom: '12rem',
    [breakpoints.down('sm')]: {
      marginBottom: '4.5rem',
    },
  },
  contentWrapper: {
    padding: '5rem',
    backgroundColor: colors.main.grey,
    borderRadius: '2rem',
    [breakpoints.down('sm')]: {
      padding: '4rem 1rem',
    },
  },
  title: { textAlign: 'center' },
  description: {
    textAlign: 'center',
    margin: '2rem 0',
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  callBtn: {
    display: 'flex',
    width: 'fit-content',
    margin: 'auto',
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      width: '100% !important',
    },
  },
}))
