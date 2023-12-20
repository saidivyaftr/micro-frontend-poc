import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const FreezeHero = () => {
  const classes = useStyles()
  const heroCarrierFreezeData = useAppData('heroCarrierFreeze', true)
  const { title, firstParagraph, secondParagraph } = heroCarrierFreezeData

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <Typography styleType="h3" tagType="h3">
          {title?.value}
        </Typography>
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={firstParagraph?.value}
          className={classes.description}
        />
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={secondParagraph?.value}
          className={classes.description}
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
}))

export default FreezeHero
