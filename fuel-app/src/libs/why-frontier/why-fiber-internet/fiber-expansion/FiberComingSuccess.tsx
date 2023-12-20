import { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import FiberIsComingCopperUnAvailable from './FiberIsComingCopperUnAvailable'
import FiberIsComingCopperAvailable from './FiberIsComingCopperAvailable'
import colors from '@/shared-ui/colors'

const FiberComingSuccess = () => {
  const classes = useStyles()
  const { scenario, selectedAddress } = useSelector((state: any) => state?.bga)
  const node = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nodeOffset = node?.current?.offsetTop || 360
    window.scrollTo({
      top: nodeOffset - 360,
      behavior: 'smooth',
    })
  }, [node])

  const renderContent = () => {
    switch (scenario) {
      case 'PAL_CONFIRMED_COPPER_UNAVAILABLE':
      case 'FUTURE_FIBER_COPPER_UNAVAILABLE':
        return <FiberIsComingCopperUnAvailable />
      case 'PAL_CONFIRMED_COPPER_AVAILABLE':
      case 'FUTURE_FIBER_COPPER_AVAILABLE':
        return (
          <FiberIsComingCopperAvailable selectedAddress={selectedAddress} />
        )
    }
  }

  return (
    <>
      <div className={classes.container}>{renderContent()}</div>
      <div ref={node}></div>
    </>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: colors.main.greenishBlue,
  },
  subheader: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    width: 'fit-content',
  },
}))

export default FiberComingSuccess
