import { InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'

const FiberIsComingCopperUnAvailable = () => {
  const { fiberComingSuccessHeader, fiberComingCopperUnavailableSubHeader } =
    useAppData('fiberComing', true)
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <>
        {fiberComingSuccessHeader?.value && (
          <InjectHTML
            tagType="h3"
            styleType="h3"
            color="secondary"
            value={fiberComingSuccessHeader?.value}
          />
        )}
        {fiberComingCopperUnavailableSubHeader?.value && (
          <InjectHTML
            tagType="p"
            styleType="p1"
            color="tertiary"
            className={classes.subheader}
            value={fiberComingCopperUnavailableSubHeader?.value}
          />
        )}
      </>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subheader: {
    fontSize: 24,
    textAlign: 'center',
    margin: 0,
    marginTop: 16,
    [breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
  button: {
    width: 'fit-content',
  },
}))

export default FiberIsComingCopperUnAvailable
