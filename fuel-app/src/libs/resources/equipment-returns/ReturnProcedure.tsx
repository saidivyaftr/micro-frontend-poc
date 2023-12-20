import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import useAppData from '@/shared-ui/hooks/useAppData'

const ReturnProcedure = () => {
  const classes = useStyles()
  const { description, notes, steps } =
    useAppData('returnProcedure', true) || {}
  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={description?.value}
          className={classes.description}
          fontType={'boldFont'}
        />
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={steps?.value}
          className={classes.steps}
        />
        <InjectHTML
          addAnchorStyles
          styleType="p1"
          value={notes?.value}
          className={classes.notes}
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
    marginTop: '20px',
  },
  description: {
    fontSize: '1.375rem',
    lineHeight: 1.4,
    margin: '1rem auto',
    '& sup': {
      fontSize: '12px',
    },
  },
  steps: {
    fontSize: '1.375rem',
    lineHeight: 1.4,
    '& span': {
      fontFamily: PP_OBJECT_SANS_BOLD,
    },
  },
  notes: {
    fontSize: '1.375rem',
    lineHeight: 1.4,
    '& span': {
      fontFamily: PP_OBJECT_SANS_BOLD,
      color: colors.main.brightRed,
    },
    '& sup': {
      fontSize: '12px',
    },
  },
}))

export default ReturnProcedure
