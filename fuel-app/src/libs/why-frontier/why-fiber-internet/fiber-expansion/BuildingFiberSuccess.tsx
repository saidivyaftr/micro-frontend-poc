import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import BuildingFiberCopperUnAvailable from './BuildingFiberCopperUnAvailable'
import BuildingFiberCopperAvailable from './BuildingFiberCopperAvailable'
import NominateYourAreaSuccess from './NominateYourAreaSuccess'
import FiberNominationSuccessNOPAL from './FiberNominationSuccessNOPAL'
import FiberNominationSuccess from './FiberNominationSuccess'

const BuildingFiberSuccess = () => {
  const { scenario, selectedAddress } = useSelector((state: any) => state?.bga)
  const node = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nodeOffset = node?.current?.offsetTop || 380
    window.scrollTo({
      top: nodeOffset - 380,
      behavior: 'smooth',
    })
  }, [node])

  const renderContent = () => {
    switch (scenario) {
      case 'PAL_NEEDED':
        return <FiberNominationSuccessNOPAL />
      case 'BUILDING_FIBER_COPPER_UNAVAILABLE':
        return <BuildingFiberCopperUnAvailable />
      case 'NO_FIBER_PLANS_COPPER_UNAVAILABLE':
        return <FiberNominationSuccess />
      case 'BUILDING_FIBER_COPPER_AVAILABLE':
        return (
          <BuildingFiberCopperAvailable selectedAddress={selectedAddress} />
        )
      case 'NO_FIBER_PLANS_COPPER_AVAILABLE':
        return <NominateYourAreaSuccess />
      case 'OUT_OF_FOOTPRINT':
        return <FiberNominationSuccess />
      case 'UNDETERMINABLE':
        return <FiberNominationSuccess />
    }
  }

  const classes = useStyles()

  return (
    <>
      <div className={classes.container}>{renderContent()}</div>
      <div ref={node}></div>
    </>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
  },
  header: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: 32,
    fontSize: '45px',
  },
  subheader: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: 32,
  },
}))

export default BuildingFiberSuccess
