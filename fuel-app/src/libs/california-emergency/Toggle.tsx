import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { ToggleButton, Typography } from '@/shared-ui/components'
import { LocationMarker } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

interface PageProps {
  // eslint-disable-next-line no-unused-vars
  onToggleHandler: (serviceCheck: boolean, powerCheck: boolean) => void
}

const Toggle = (props: PageProps) => {
  const classes = useStyles()
  const [serviceCheck, isServiceCheck] = useState(false)
  const [powerCheck, isPowerCheck] = useState(false)
  const { onToggleHandler } = props
  const { service, power, powerShutoff, emergency } = useAppData('toggle', true)

  const onToggleService = (data: boolean) => {
    isServiceCheck(data)
  }

  const onTogglePower = (data: boolean) => {
    isPowerCheck(data)
  }

  useEffect(() => {
    onToggleHandler(serviceCheck, powerCheck)
  }, [serviceCheck, powerCheck])
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ToggleButton
          onClickToggle={onToggleService}
          isChecked={serviceCheck}
        />
        <div className={classes.iconWithText}>
          <LocationMarker
            color={colors.main.pumpkin}
            width={'24px'}
            height={'24px'}
          />
          <Typography
            tagType="p"
            styleType="p2"
            fontType={serviceCheck ? 'regularFont' : 'boldFont'}
          >
            {service.value}
          </Typography>
        </div>
      </div>

      <div className={classes.content}>
        <ToggleButton onClickToggle={onTogglePower} isChecked={powerCheck} />
        <div>
          <div className={classes.iconWithText}>
            <LocationMarker
              color={colors.main.steelBlue}
              width={'24px'}
              height={'24px'}
            />
            <Typography
              tagType="p"
              styleType="p2"
              fontType={powerCheck ? 'regularFont' : 'boldFont'}
            >
              {power.value}
            </Typography>
          </div>
          <div className={classes.iconWithText}>
            <LocationMarker
              color={colors.main.brickRed}
              width={'24px'}
              height={'24px'}
            />
            <Typography
              tagType="p"
              styleType="p2"
              fontType={powerCheck ? 'regularFont' : 'boldFont'}
            >
              {powerShutoff.value}
            </Typography>
          </div>
          <div className={classes.stateEmergency}>
            <div className={classes.iconWithText}>
              <Typography
                tagType="p"
                styleType="p2"
                fontType={powerCheck ? 'boldFont' : 'regularFont'}
              >
                {emergency.value}
              </Typography>
            </div>
          </div>
        </div>

        <div
          className={
            powerCheck ? classes.emergencyBox : classes.hideEmergencyBox
          }
        ></div>
      </div>

      <div className={classes.content}>
        <Typography tagType="p" styleType="p2">
          {'Frontier Service Areas'}
        </Typography>
        <div className={classes.serviceBox}></div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    [breakpoints.down('lg')]: {
      flexWrap: 'wrap',
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'nowrap',
    },
  },
  content: {
    marginTop: '1rem',
    display: 'flex',
    flex: '1',
    alignItems: 'flex-start',
    marginLeft: '1rem',
    minWidth: '24rem',
    '& p': { marginTop: 0, marginBottom: '1rem' },
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  emergencyBox: {
    background: colors.main.cyan,
    height: '3.5rem',
    width: '5rem',
    opacity: 1,
    transition: 'all .5s ease-out',
    marginLeft: '2rem',
  },
  serviceBox: {
    background: colors.main.torchRed,
    height: '3.5rem',
    width: '5rem',
    [breakpoints.up('md')]: {
      marginLeft: '3rem',
    },
    [breakpoints.down('sm')]: {
      marginLeft: '7.8rem',
    },
  },
  hideEmergencyBox: {
    background: colors.main.newBackgroundGray,
    height: '3.5rem',
    width: '5rem',
    transition: 'all .5s ease-out',
    marginLeft: '2rem',
  },
  stateEmergency: {
    marginLeft: '1.5rem',
  },
  iconWithText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '30px',
    marginLeft: '1rem',
  },
}))

export default Toggle
