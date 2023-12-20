import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import {
  COMPONENT_WRAPPER,
  EQUIPMENT_RETURN_THANK,
  VISITOR,
} from 'src/constants'
import Image from 'next/future/image'
import { useDispatch } from 'react-redux'
import { equipmentReturnFindSlice } from 'src/redux/slicers'
import { useAppData, usePageLoadEvents } from '../../hooks'
import colors from '@/shared-ui/colors'

const ReturnsThank = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { title, description, ReturnButtonLabel, desktopImage } =
    useAppData('returnsThank', true) || {}

  const handleReturn = async () => {
    await dispatch(equipmentReturnFindSlice.actions.setStep('RETURNS_FIND'))
  }

  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: EQUIPMENT_RETURN_THANK,
      eVar22: VISITOR,
    },
  })
  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <div className={classes.bgContainer}>
          <Image
            src={desktopImage?.src}
            alt={desktopImage?.alt}
            className={classes.bgImage}
          />
          <div className={classes.content}>
            <Typography styleType="h4" tagType="h2" className={classes.header}>
              {title?.value}
            </Typography>
            <InjectHTML
              addAnchorStyles
              styleType="p1"
              value={description?.value}
              className={classes.description}
            />
            <div className={classes.btnContainer}>
              <Button
                type="submit"
                variant="primary"
                onClick={handleReturn}
                className={classes.btn}
                hoverVariant="secondary"
                text={ReturnButtonLabel.value}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'center',
  },
  header: {
    marginTop: '1.5rem',
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
  },
  section: {
    padding: '4.25rem 0',
    margin: '0 auto',
    [breakpoints.down('sm')]: {
      paddingTop: '2rem 0',
    },
  },
  description: {
    margin: 'auto',
    width: 'max-content',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 16,
    marginBottom: 24,
    width: '100%',
    background: colors.main.white,
    color: colors.main.primaryRed,
  },
  bgContainer: {
    position: 'relative',
    textAlign: 'center',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  bgImage: {
    width: '100%',
    height: 'auto',
    [breakpoints.down('sm')]: {
      height: '50vh',
    },
    [breakpoints.down('xs')]: {
      height: '70vh',
    },
  },
}))

export default ReturnsThank
