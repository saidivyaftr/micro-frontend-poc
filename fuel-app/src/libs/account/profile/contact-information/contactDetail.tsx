import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { Typography, Button } from '@/shared-ui/components'
import {
  VerifiedBadgeIconBlack,
  WarningOutline,
} from 'src/blitz/assets/react-icons'
import clx from 'classnames'
import { useEffect } from 'react'
import { ContactDetailInfo } from './types'
import { IconMinus } from 'src/blitz/assets/react-icons'
import { useState } from 'react'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const ContactDetail = (props: ContactDetailInfo) => {
  const classes = useStyles()
  const contactInformationData = useAppData('contactInformationData', true)
  const {
    editState,
    value,
    id,
    isPrimary,
    isVerified,
    setPrimaryContact,
    removeContact,
    updateEditState,
    type,
  } = props
  const { isEditing, isSettingPrimary, verifyContact, isAddingNewContactItem } =
    editState
  useEffect(() => {
    if (!verifyContact) {
      setVerifyLoading(false)
    }
    setPrimaryLoading(false)
    setcontactDeleteLoading(false)
  }, [isEditing, isSettingPrimary, isAddingNewContactItem, verifyContact])

  const [iscontactDeleteLoading, setcontactDeleteLoading] = useState(false)
  const [isSetPrimaryLoading, setPrimaryLoading] = useState(false)
  const [isSetVerifyLoading, setVerifyLoading] = useState(false)

  const { makePrimaryLabel, primaryLabel, verifiedLabel, verifyLabel } =
    contactInformationData

  const triggerOtpVerification = (id: string, value: string) => {
    updateEditState({
      verifyContact: true,
      verifyContactId: id,
      verifyContactValue: value,
      hasApiFailed: false,
    })
  }

  const isDeleteContactEnabled = () => {
    return (
      isEditing && !isPrimary && !isSettingPrimary && !isAddingNewContactItem
    )
  }

  return (
    <div className={classes.contactDetailrow}>
      <div className={classes.contactDetailItem}>
        <div className={classes.contactDetailISection}>
          <Typography
            styleType="p1"
            tagType="p"
            className={classes.contactRowItem}
          >
            <>
              {isDeleteContactEnabled() && (
                <Button
                  className={classes.deleteItem}
                  type="button"
                  buttonSize="small"
                  variant="lite"
                  hoverVariant="secondary"
                  isBusy={iscontactDeleteLoading}
                  onClick={() => {
                    setcontactDeleteLoading(true)
                    removeContact(id)
                  }}
                  text={<IconMinus />}
                ></Button>
              )}
              {value}
            </>
          </Typography>
          {isPrimary && (
            <Typography
              styleType="p1"
              className={clx(classes.primaryItem, classes.contactRowItem)}
              tagType="p"
              fontType="boldFont"
            >
              {primaryLabel?.value}
            </Typography>
          )}
        </div>

        {isVerified && (
          <div className={classes.verifyItemSection}>
            {isSettingPrimary && !isPrimary ? (
              <Button
                type="button"
                buttonSize="small"
                variant="lite"
                className={clx(classes.link, classes.contactRowItem)}
                text={makePrimaryLabel?.value}
                disabled={isSetPrimaryLoading}
                isBusy={isSetPrimaryLoading}
                onClick={() => {
                  setPrimaryLoading(true)
                  setPrimaryContact(id)
                }}
              ></Button>
            ) : (
              <Typography
                styleType="p1"
                className={clx(classes.verifiedItem, classes.contactRowItem)}
                tagType="p"
                fontType="boldFont"
              >
                {verifiedLabel?.value}
              </Typography>
            )}
          </div>
        )}
        {!isVerified && (type === 'Mobile' || type === 'Email') && (
          <div className={clx(classes.verifyItemSection)}>
            <div className={classes.contactRowItem}>
              <WarningOutline color={colors.main.brightRed} />
            </div>
            <Button
              type="button"
              buttonSize="small"
              variant="lite"
              className={clx(classes.link, classes.contactRowItem)}
              text={verifyLabel?.value}
              disabled={verifyContact}
              isBusy={isSetVerifyLoading}
              onClick={async () => {
                triggerOtpVerification(id, value)
                setVerifyLoading(true)
              }}
            ></Button>
          </div>
        )}
      </div>
      {isVerified && (
        <div className={classes.contactRowItem}>
          <VerifiedBadgeIconBlack />
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  contactDetailrow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '.5rem',
  },
  contactRowItem: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    margin: 0,
    display: 'flex',
    gap: 4,
    [breakpoints.down('xs')]: {
      fontSize: '0.875rem',
      lineHeight: '1.125rem',
    },
  },
  contactDetailItem: {
    flexGrow: 1,
    marginBottom: '1rem ',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'start',
      gap: '.5rem',
    },
  },
  contactDetailISection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '.5rem',
    flex: 1,
    flexWrap: 'wrap',
    wordBreak: 'break-all',
    [breakpoints.down('xs')]: {
      gap: '0.25rem',
    },
  },
  verifyItemSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '.5rem',
  },
  verifiedItem: {
    fontSize: '.875rem',
    lineHeight: '1.125rem',
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  primaryItem: {
    fontSize: '.875rem',
    lineHeight: '1.125rem',
    color: `${colors.main.grayOpacity50}`,
  },
  deleteItem: {
    height: '1.125rem',
    width: 'fit-content',
    borderRadius: '0.75rem',
    marginRight: 4,
    display: 'block',
    '&:not([disabled])': {
      backgroundColor: 'red',
    },
    minWidth: 'unset',
    '& svg': {
      marginLeft: 0,
    },
    '&:not([disabled]):hover': {
      backgroundColor: `${colors.main.midnightExpress}`,
      borderRadius: '0.75rem',
    },
  },
  busyLoader: {
    backgroundColor: 'white',
  },
  link: {
    fontFamily: PP_OBJECT_SANS,
    fontSize: '.875rem',
    lineHeight: '1.125rem',
    textDecoration: 'underline',
    padding: 0,
    width: 'fit-content',
    height: 'fit-content',
    minWidth: 'fit-content',
  },
}))

export default ContactDetail
