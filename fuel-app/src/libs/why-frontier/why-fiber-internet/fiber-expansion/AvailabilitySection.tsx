import { useEffect, useState, useRef } from 'react'
import clx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { COMPONENT_WRAPPER } from 'src/constants'
import CheckAvailability from './CheckAvailability'
import NominateYourArea from './NominateYourArea'
import colors from '@/shared-ui/colors'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import BuildingFiber from './BuildingFiber'
import FiberComing from './FiberComing'
import FiberComingSuccess from './FiberComingSuccess'
import NominateYourAreaSuccess from './NominateYourAreaSuccess'
import FiberAvailable from './FiberAvailable'
import BuildingFiberSuccess from './BuildingFiberSuccess'
import NominateYourAreaThanksGreaterThan2 from './NominateYourAreaThanksGreaterThan2'
import NominateYourAreaThanksLessThan2 from './NominateYourAreaThanksLessThan2'
import FiberNominationSuccess from './FiberNominationSuccess'
import StickyBar from './StickyBar'

const HEADER_HEIGHT = 65
const NODE_MARGIN = 70

const AvailabilitySection = () => {
  const classes = useStyles()
  const { step } = useSelector((state: State) => state.bga) || {}
  const [isSectionFixed, setIsSectionFixed] = useState(false)

  const shouldStickOnScroll = step === 'check_availability'
  const shouldStickyBarOnScroll = step === 'fiber_is_available'
  const node = useRef<HTMLDivElement>(null)
  let isListenerAdded = false
  let offset = 0

  const handleScroll = () => {
    if (document) {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop

      const elementOffsetTop = offset || node?.current?.offsetTop || 0
      if (elementOffsetTop !== offset) {
        offset = elementOffsetTop
      }
      let winScrollValue = 0
      if (step === 'fiber_is_available') {
        winScrollValue = 50
      }
      const shouldBeFixed =
        winScroll - winScrollValue > offset - HEADER_HEIGHT - NODE_MARGIN
      if (shouldBeFixed !== isSectionFixed) {
        setIsSectionFixed(shouldBeFixed)
      }
    }
  }

  const handleScrollToSection = () => {
    const nodeOffset = node?.current?.offsetTop || 420
    window.scrollTo({
      top: nodeOffset - 420,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (!isListenerAdded) {
      isListenerAdded = true
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [step, isSectionFixed])

  const renderContent = () => {
    switch (step) {
      case 'nominate_area':
        return <NominateYourArea />
      case 'nominate_area_success':
        return <NominateYourAreaSuccess />
      case 'building_fiber':
        return <BuildingFiber />
      case 'building_fiber_success':
        return <BuildingFiberSuccess />
      case 'fiber_is_coming':
        return <FiberComing />
      case 'fiber_is_coming_success':
        return <FiberComingSuccess />
      case 'fiber_nomination_success':
        return <FiberNominationSuccess />
      case 'fiber_is_available':
        return <FiberAvailable />
      case 'nominate_thanks_greater_than_2':
        return <NominateYourAreaThanksGreaterThan2 />
      case 'nominate_thanks_less_than_2':
        return <NominateYourAreaThanksLessThan2 />
      case 'check_availability':
      default:
        return (
          <CheckAvailability
            isSectionFixed={isSectionFixed}
            handleScrollToSection={handleScrollToSection}
          />
        )
    }
  }

  return (
    <>
      <div
        className={clx(classes.root, {
          [classes.fixedWrapper]: isSectionFixed && shouldStickOnScroll,
        })}
      >
        <div
          className={clx(classes.content, {
            [classes.fixedContentContainer]: isSectionFixed,
            [classes.fiberAvailableAlignment]: step === 'fiber_is_available',
            [classes.checkAddressAlignment]: step !== 'fiber_is_available',
          })}
        >
          {renderContent()}
        </div>
      </div>
      <div ref={node}>&nbsp;</div>
      <div
        className={clx(classes.stickyRoot, {
          [classes.stickyFixedWrapper]:
            isSectionFixed && shouldStickyBarOnScroll,
        })}
      >
        {step === 'fiber_is_available' ? (
          <div className={classes.stickyContent}>
            <StickyBar isSectionFixed={isSectionFixed} />
          </div>
        ) : null}
      </div>
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
  },
  content: {
    backgroundColor: colors.main.midnightExpress,
    borderRadius: 32,
    width: '100%',
  },
  checkAddressAlignment: {
    padding: '48px',
    [breakpoints.down('xs')]: {
      padding: '32px 16px !important',
    },
  },
  fiberAvailableAlignment: {
    padding: '64px 64px',
    [breakpoints.down('xs')]: {
      padding: '32px 16px !important',
    },
  },
  fixedContentContainer: {
    padding: '32px 24px',
    borderRadius: '32px',
    [breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
  fixedWrapper: {
    marginTop: 0,
    position: 'sticky',
    top: 55,
    zIndex: 10,
    display: 'flex',
    animation: `all 1.3s linear infinite forwards`,
    [breakpoints.down('sm')]: {
      top: 45,
    },
    [breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  stickyRoot: {
    ...COMPONENT_WRAPPER,
    [breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  stickyContent: {
    backgroundColor: colors.main.midnightExpress,
    borderRadius: 16,
    [breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
  stickyFixedWrapper: {
    marginTop: 0,
    position: 'sticky',
    top: 55,
    zIndex: 10,
    animation: `all 1.3s linear infinite forwards`,
    [breakpoints.down('sm')]: {
      top: 45,
    },
    [breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}))

export default AvailabilitySection
