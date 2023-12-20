import { InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'

const BuildingFiberCopperUnAvailable = () => {
  const {
    buildingFiberSuccessHeader,
    buildingFiberCopperUnavialableSubHeader,
  } = useAppData('buildingFiber', true)
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <>
        {buildingFiberSuccessHeader?.value && (
          <InjectHTML
            tagType="h3"
            styleType="h3"
            color="secondary"
            value={buildingFiberSuccessHeader?.value}
          />
        )}
        {buildingFiberCopperUnavialableSubHeader?.value && (
          <InjectHTML
            tagType="p"
            styleType="p1"
            color="tertiary"
            className={classes.subheader}
            value={buildingFiberCopperUnavialableSubHeader?.value}
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

export default BuildingFiberCopperUnAvailable
