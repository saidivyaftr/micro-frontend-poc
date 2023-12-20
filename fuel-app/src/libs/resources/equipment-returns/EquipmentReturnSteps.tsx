import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { useAppData } from '@/shared-ui/hooks/index'

const EquipmentReturnsSteps = () => {
  const classes = useStyles()
  const { description, steps } = useAppData('returnSteps', true) || {}
  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <InjectHTML
          addAnchorStyles
          styleType="h5"
          value={description?.value}
          className={classes.title}
          fontType="regularFont"
        />
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={steps?.value}
          className={classes.steps}
          fontType="regularFont"
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
    marginTop: '30px',
  },
  title: {
    marginBottom: '2rem',
    fontWeight: 500,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  section: {
    paddingTop: '1.5rem',
    textAlign: 'left',
  },
  steps: {
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
    fontSize: '1.375rem',
    lineHeight: 1.4,
    '& span': {
      color: colors.main.brightRed,
    },
    '& p': {
      margin: '0 0 2rem 0.5rem',
    },
    '& sup': {
      fontSize: '12px',
    },
    '& a': {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}))

export default EquipmentReturnsSteps
