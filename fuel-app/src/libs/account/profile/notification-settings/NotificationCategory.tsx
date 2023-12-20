import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@/shared-ui/components'
import clx from 'classnames'
import { ChevronDown, ChevronUp } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { NotificationToggle } from './NotificationToggle'
import { useAppData } from 'src/hooks'

export type CategoryType =
  | 'serviceUpdates'
  | 'accountInformation'
  | 'marketingPromotions'
  | 'billReadyNotification'

export const NotificationCategory = ({
  title,
  description,
  type,
  email,
  sms,
}: {
  title: string
  description: string
  type: CategoryType
  email: boolean
  sms?: boolean
}) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const notificationSettingsData = useAppData('notificationSettingsData', true)

  const getMessage = () => {
    const turnedOnServices = []
    if (email) {
      turnedOnServices.push(notificationSettingsData?.email?.value)
    }
    if (sms) {
      turnedOnServices.push(notificationSettingsData?.sms?.value)
    }
    if (turnedOnServices.length > 0) {
      return `${notificationSettingsData?.on?.value}: ${turnedOnServices.join(
        ` ${notificationSettingsData?.and?.value} `,
      )}`
    }
    return ''
  }

  const getLegalText = () => {
    switch (type) {
      case 'accountInformation':
      case 'billReadyNotification':
        return notificationSettingsData?.accountUpdatesLegal?.value
      case 'serviceUpdates':
        return notificationSettingsData?.serviceAlertsLegal?.value
      case 'marketingPromotions':
        return notificationSettingsData?.productReleasesLegal?.value
    }
  }

  return (
    <div className={classes.settingContainer}>
      <div className={classes.section} onClick={() => setIsOpen(!isOpen)}>
        <div>
          <Typography
            styleType="p2"
            fontType="boldFont"
            className={classes.sectionItem}
          >
            {title}
          </Typography>
          {!isOpen && (
            <Typography styleType="p2" className={classes.togglePeekView}>
              {getMessage()}
            </Typography>
          )}
        </div>
        {isOpen ? (
          <ChevronUp height="18" width="18" />
        ) : (
          <ChevronDown height="18" width="18" />
        )}
      </div>
      <div
        className={clx(classes.accordionClosed, {
          [classes.accordionOpen]: isOpen,
        })}
      >
        <Typography>{description}</Typography>
        <div className={classes.toggleContainer}>
          <NotificationToggle
            title={notificationSettingsData?.email?.value}
            settingType="email"
            value={email}
            type={type}
          />
          {sms !== undefined && (
            <NotificationToggle
              title={notificationSettingsData?.textOrSms?.value}
              settingType="sms"
              value={sms}
              type={type}
            />
          )}
        </div>
        <Typography styleType="legal">{getLegalText()}</Typography>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  settingContainer: {
    borderBottom: `1px solid ${colors.main.borderGrey}`,
    paddingBottom: 16,
    marginBottom: 16,
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    cursor: 'pointer',
    '& svg': {
      '& path': {
        fill: colors.main.dark,
        fillOpacity: 1,
      },
    },
    '&:hover': {
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
          fillOpacity: 1,
        },
      },
    },
  },
  sectionItem: {
    flex: 1,
    marginBottom: 8,
  },
  accordionClosed: {
    height: 0,
    display: 'none',
  },
  accordionOpen: {
    height: 'auto',
    display: 'block',
  },
  toggleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    margin: '32px 0',
  },
  togglePeekView: {
    color: colors.main.grayOpacity50,
  },
}))
