import { COMPONENT_WRAPPER } from 'src/constants'
import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'

const FreezeLegal = () => {
  const classes = useStyles()
  const legalCarrierFreezeData = useAppData('legalCarrierFreeze', true)
  const { title, subtitle, body1, body2, body3, body4 } = legalCarrierFreezeData

  return (
    <div className={classes.wrapper}>
      <Typography tagType="h3">{title?.value}</Typography>
      <Typography tagType="p">{subtitle?.value}</Typography>
      <div className={classes.iAgree}>
        <Typography tagType="span">{body1?.value}</Typography>
        <br />
        <Typography tagType="span">{body2?.value}</Typography>
        <br />
        <Typography tagType="span">{body3?.value}</Typography>
      </div>
      <Typography tagType="p">{body4?.value}</Typography>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    maxWidth: 1232,
    marginTop: 20,
    textAlign: 'left',
    padding: '20px',
  },
  iAgree: {
    lineHeight: '1.2',
    fontWeight: 'bold',
  },
}))

export default FreezeLegal
