import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import useAppData from '@/shared-ui/hooks/useAppData'

const ReturnsPolicy = () => {
  const classes = useStyles()
  const { description } = useAppData('returnPolicy', true) || {}
  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <InjectHTML
          addAnchorStyles
          styleType="p2"
          value={description?.value}
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
    padding: '1.5rem 0',
    textAlign: 'left',
  },
  description: {
    fontSize: '1rem',
    '& span': {
      fontFamily: PP_OBJECT_SANS_BOLD,
    },
    '& sup': {
      fontSize: '12px',
    },
  },
}))

export default ReturnsPolicy
