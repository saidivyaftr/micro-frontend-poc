import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import useAppData from '@/shared-ui/hooks/useAppData'
const Details = () => {
  const classes = useStyles()
  const { details, titleLine } = useAppData('directvDetails', true)
  return (
    <div className={classes.root}>
      <Typography styleType="p3" tagType="h5">
        {titleLine?.value}
      </Typography>
      <InjectHTML
        value={details?.value}
        styleType="p3"
        className={classes.details}
      />
    </div>
  )
}

const useStyles = makeStyles(({}) => ({
  root: {
    ...COMPONENT_WRAPPER,
    marginTop: 15,
    maxWidth: 1135,
    marginBottom: 30,
  },
  details: {
    '& span': {
      textDecoration: 'underline',
    },
    '& a': {
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      '&:hover': {
        color: colors.main.brightRed,
        textDecoration: 'underline',
      },
    },
  },
}))

export default Details
