import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography, Button } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const FreezeThankYou = () => {
  const classes = useStyles()
  const thankYouCarrierFreezeData = useAppData('thankYouCarrierFreeze', true)
  const { title, subtitle, closure, signature, goHomeBtn, goHomeUrl } =
    thankYouCarrierFreezeData

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <Typography styleType="h3" tagType="h3">
          {title?.value}
        </Typography>
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={subtitle?.value}
          className={classes.description}
        />
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={closure?.value}
          className={classes.description}
        />
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={signature?.value}
          className={classes.description}
        />

        <Button
          type="link"
          href={goHomeUrl?.value}
          className={classes.btn}
          text={goHomeBtn?.value}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
  },
  section: {
    paddingTop: '70px',
    textAlign: 'left',
  },
  description: {
    paddingTop: '20px',
    maxWidth: 'auto',
    margin: 'auto',
  },
  btn: {
    lineHeight: '10rem',
  },
}))

export default FreezeThankYou
