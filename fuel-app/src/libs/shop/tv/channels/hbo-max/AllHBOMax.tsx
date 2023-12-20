import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import CardTwoColumnLayout from './components/CardTwoColumnLayout'

const AllHBOMax = () => {
  const classes = useStyles()
  const data = useAppData('allHBO', true)

  if (!data?.title?.value || !data?.content?.value) {
    return null
  }

  return (
    <div id="all-hbo-max" className={classes.wrapper}>
      <CardTwoColumnLayout data={data} />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: `${typography.pxToRem(80)} 0`,
    margin: '0 auto',
    [breakpoints.down('xs')]: {
      padding: `${typography.pxToRem(40)} 0`,
    },
  },
}))

export default AllHBOMax
