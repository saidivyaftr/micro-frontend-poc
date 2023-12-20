import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'

const ProviderAndBills = ({ data }: any) => {
  const classes = useStyles()
  const { firstTitle, secondTitle, firstDescription, secondDescription } = data

  if (Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <Typography styleType="h4" tagType="h2">
          {firstTitle?.value}
        </Typography>
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={firstDescription?.value}
          style={{ marginBottom: '4rem' }}
        />
        <Typography styleType="h4" tagType="h2">
          {secondTitle?.value}
        </Typography>
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={secondDescription?.value}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
    maxWidth: '996px',
  },
  section: {
    paddingTop: '1.5rem',
    textAlign: 'left',
    maxWidth: '900px',
  },
}))

export default ProviderAndBills
