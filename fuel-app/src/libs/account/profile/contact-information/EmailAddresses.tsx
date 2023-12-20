import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { TechnicalErrorIcon } from '@/shared-ui/react-icons'
import { useProfileEmailAddresses } from 'src/selector-hooks'
import { Typography } from '@/shared-ui/components'
import { Edit, WarningOutline } from 'src/blitz/assets/react-icons'
import ContactDetail from './contactDetail'
import { useState } from 'react'
import EditcontactInfo from './EditContactInfo'
import APIClient from 'src/api-client'
import { fetchEmailAddresses } from 'src/redux/slicers/profile'
import { useDispatch } from 'react-redux'
import { useActiveAccountId } from 'src/selector-hooks'
import VerifyEmail from '../../shared/VerifyEmail'
import { Skeleton } from '@/shared-ui/components'
import ActionModal from '../../shared/modals/ActionModal'
import ErrorMessage from '../../shared/ErrorMessage'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const EmailAddresses = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const contactInformationData = useAppData('contactInformationData', true)
  const errorMessages = useAppData('errorMessages', true)
  const activeAccountId = useActiveAccountId()
  const {
    isLoading: isEmailDataLoading,
    data: emailData,
    errorFetching,
  } = useProfileEmailAddresses()
  const {
    emailAddresses,
    doneButtonLabel,
    AddEmailLabel,
    changePrimaryEmailLabel,
    verifyNumber,
    primarySuccessEmailTitle,
    primarySuccessEmailSubTitle,
    noVerifiedEmailTitle,
    noVerifiedEmailSubTitle,
  } = contactInformationData
  const sortedEmailData = emailData
    ?.slice()
    .sort((prev: any, next: any) =>
      prev?.isPrimary === next?.isPrimary ? 0 : prev.isPrimary ? -1 : 1,
    )

  const hasVerifiedContact = sortedEmailData.some(
    (item: any) => item?.verified && !item.isPrimary,
  )
  const initialstate = {
    isEditing: false,
    isSettingPrimary: false,
    isAddingNewContactItem: false,
    verifyContact: false,
    verifyContactValue: '',
    verifyContactId: '',
    verifyContactPrimary: false,
    hasApiFailed: false,
    primaryContactStatusModal: false,
    primaryContactSuccessModal: false,
  }
  const [editState, setEditState] = useState(initialstate)
  const {
    isEditing,
    verifyContact,
    verifyContactValue,
    verifyContactId,
    verifyContactPrimary,
    hasApiFailed,
    primaryContactStatusModal,
    primaryContactSuccessModal,
  } = editState
  const updateEditState = (update: any) => {
    setEditState((prevObject) => ({
      ...prevObject,
      ...update,
    }))
  }
  const setHasApiFailed = (status: boolean) => {
    updateEditState({ hasApiFailed: status })
  }
  const removeEmailAddress = async (id: string) => {
    setHasApiFailed(false)
    try {
      await APIClient.removeEmailAddresses(activeAccountId, id)
      dispatch(fetchEmailAddresses(activeAccountId))

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:contact information:delete email address',
        },
        'tl_o',
        'my profile:contact information:delete email address',
      )
    } catch (e) {
      setHasApiFailed(true)
    }
  }
  const setPrimaryEmail = async (id: string) => {
    try {
      setHasApiFailed(false)
      const data = {
        isPrimary: true,
      }
      await APIClient.makeEmailAddressesPrimary(activeAccountId, data, id)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:contact information:update primary email address',
        },
        'tl_o',
        'my profile:contact information:update primary email address',
      )

      updateEditState({
        primaryContactSuccessModal: true,
      })
    } catch (e) {
      setHasApiFailed(true)
    }
  }

  const closeAndUpdatePrimarySuccessModal = () => {
    updateEditState({
      primaryContactSuccessModal: false,
    })
    dispatch(fetchEmailAddresses(activeAccountId))
  }

  const closePrimaryStatusModal = () => {
    updateEditState({
      primaryContactStatusModal: false,
    })
  }

  if (isEmailDataLoading) {
    return <PrpfileInformationSkeleton />
  }

  return (
    <>
      {hasApiFailed && (
        <div className={classes.invalidError}>
          <WarningOutline />
          <Typography className={classes.invalidErrorMsg} fontType="mediumFont">
            {contactInformationData?.errorUpdatingContactInfo?.value}
          </Typography>
        </div>
      )}
      <Typography
        styleType="p2"
        fontType="boldFont"
        className={classes.sectionItem}
      >
        <span className={classes.editContainer}>
          {emailAddresses?.value}
          {!isEditing && !errorFetching && (
            <button
              className={classes.showHideBtn}
              onClick={() => {
                updateEditState({ isEditing: true })
              }}
            >
              <Edit />
            </button>
          )}
        </span>
      </Typography>
      {errorFetching && (
        <ErrorMessage message={errorMessages?.fetchFailed?.value} />
      )}
      {sortedEmailData?.map((data: any, index: any) => {
        const { address, isPrimary, id } = data
        const isVerified = data?.verified
        return (
          <ContactDetail
            key={`contact-email-details-${index}`}
            id={id}
            value={address}
            isPrimary={isPrimary}
            isVerified={isVerified}
            editState={editState}
            updateEditState={updateEditState}
            setPrimaryContact={setPrimaryEmail}
            removeContact={removeEmailAddress}
            type="Email"
          />
        )
      })}
      {isEditing && (
        <EditcontactInfo
          editState={editState}
          updateEditState={updateEditState}
          changePrimaryLabel={changePrimaryEmailLabel?.value}
          doneButtonLabel={doneButtonLabel?.value}
          addNewItemLabel={AddEmailLabel?.value}
          type="email"
          hasVerifiedContact={hasVerifiedContact}
          showChangePrimary={sortedEmailData.length > 0}
        />
      )}
      {verifyContact && (
        <VerifyEmail
          contactId={verifyContactId}
          contactValue={verifyContactValue}
          isContactPrimary={verifyContactPrimary}
          updateEditState={updateEditState}
        />
      )}
      <ActionModal
        isOpen={primaryContactSuccessModal}
        handleClose={closeAndUpdatePrimarySuccessModal}
        primaryBtnText={verifyNumber?.targetItem?.okButton?.value}
        className={classes.modalRoot}
        info={
          <div className={classes.rootSuccess}>
            <Typography styleType="h4" className={classes.modalTitle}>
              {primarySuccessEmailTitle?.value}
            </Typography>
            <Typography styleType="h6" fontType="regularFont">
              {primarySuccessEmailSubTitle?.value}
            </Typography>
          </div>
        }
        primaryBtnAction={closeAndUpdatePrimarySuccessModal}
      />
      <ActionModal
        isOpen={primaryContactStatusModal}
        handleClose={closePrimaryStatusModal}
        className={classes.modalRoot}
        info={
          <div className={classes.rootSuccess}>
            <Typography className={classes.modalTitle} styleType="h4">
              {noVerifiedEmailTitle?.value}
            </Typography>
            <Typography styleType="h6" fontType="regularFont">
              {noVerifiedEmailSubTitle?.value}
            </Typography>
          </div>
        }
        primaryBtnText={verifyNumber?.targetItem?.okButton?.value}
        primaryBtnAction={closePrimaryStatusModal}
        icon={<TechnicalErrorIcon height={80} width={80} />}
      />
    </>
  )
}

const PrpfileInformationSkeleton = () => {
  return (
    <div>
      <Skeleton width={'70%'} height={30} />
      <Skeleton width={'80%'} height={90} />
      <Skeleton width={'60%'} height={30} />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  sectionItem: {
    marginBottom: '1rem ',
    [breakpoints.down('xs')]: {
      fontSize: '0.875rem',
      lineHeight: '1.125rem',
    },
  },
  showHideBtn: {
    background: 'transparent',
    border: 0,
    '&:hover': {
      cursor: 'pointer',
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  editContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
  },
  invalidError: {
    display: 'flex',
    gap: 4,
    '& svg': {
      '& path': {
        fill: colors.main.errorRed,
      },
    },
  },
  invalidErrorMsg: {
    color: colors.main.errorRed,
  },
  modalTitle: {
    alignSelf: 'center',
  },
  rootSuccess: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '.5rem',
  },
  modalRoot: {
    padding: '80px 0',
    '& .primaryBtn': {
      [breakpoints.down('xs')]: {
        width: 'calc(100% - 2rem)',
      },
    },
  },
}))

export default EmailAddresses
