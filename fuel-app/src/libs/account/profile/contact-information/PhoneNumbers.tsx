import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { TechnicalErrorIcon } from '@/shared-ui/react-icons'
import { useAppData } from 'src/hooks'
import { useProfilePhoneNumbers } from 'src/selector-hooks'
import { useMemo, useState } from 'react'
import { Typography } from '@/shared-ui/components'
import { Edit, WarningOutline } from 'src/blitz/assets/react-icons'
import { addDashes } from 'src/utils/mobile-helpers'
import ContactDetail from './contactDetail'
import EditcontactInfo from './EditContactInfo'
import { useActiveAccountId } from 'src/selector-hooks'
import APIClient from 'src/api-client'
import { fetchPhoneNumbers } from 'src/redux/slicers/profile'
import { useDispatch } from 'react-redux'
import VerifyPhone from '../../shared/VerifyPhone'
import { Skeleton } from '@/shared-ui/components'
import ActionModal from '../../shared/modals/ActionModal'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const PhoneNumbers = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const contactInformationData = useAppData('contactInformationData', true)
  const errorMessages = useAppData('errorMessages', true)
  const activeAccountId = useActiveAccountId()
  const {
    phoneNumbersLabel,
    changePrimaryNumberLabel,
    doneButtonLabel,
    AddNumberLabel,
    verifyNumber,
    primarySuccessPhoneTitle,
    primarySuccessPhoneSubTitle,
    noVerifiedPhoneTitle,
    noVerifiedPhoneSubTitle,
  } = contactInformationData

  const {
    data: phoneNumbers,
    isLoading: isPhoneDataLoading,
    errorFetching,
  } = useProfilePhoneNumbers()

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
    verifyContactValue,
    verifyContact,
    verifyContactPrimary,
    verifyContactId,
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

  const filteredPhoneNumbers = useMemo(() => {
    if (phoneNumbers?.length > 0) {
      return phoneNumbers?.reduce((prevNumbers: any, phoneNumber: any) => {
        const editableNumber = {
          ...phoneNumber,
        }
        editableNumber.formattedNumber = addDashes(editableNumber.number)
        prevNumbers.push(editableNumber)
        return prevNumbers
      }, [])
    }
    return []
  }, [phoneNumbers])

  const sortedPhoneNumbers = filteredPhoneNumbers?.sort(
    (prev: any, next: any) =>
      prev?.isPrimary === next?.isPrimary ? 0 : prev?.isPrimary ? -1 : 1,
  )

  const hasVerifiedContact = sortedPhoneNumbers.some(
    (item: any) => item?.verified && !item.isPrimary,
  )

  const setPrimaryPhone = async (phoneId: string) => {
    setHasApiFailed(false)
    try {
      const data = {
        isPrimary: true,
      }
      await APIClient.makePhonePrimary(activeAccountId, data, parseInt(phoneId))
      updateEditState({
        primaryContactSuccessModal: true,
      })

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:contact information:update primary phone number',
        },
        'tl_o',
        'my profile:contact information:update primary phone number',
      )
    } catch (e) {
      setHasApiFailed(true)
    }
  }

  const removePhoneNumber = async (phoneId: string) => {
    setHasApiFailed(false)
    try {
      await APIClient.removePhoneNumber(activeAccountId, phoneId)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:contact information:remove phone number',
        },
        'tl_o',
        'my profile:contact information:remove phone number',
      )
      dispatch(fetchPhoneNumbers(activeAccountId))
    } catch (e) {
      setHasApiFailed(true)
    }
  }

  const closeAndUpdatePrimarynumberSuccessModal = () => {
    updateEditState({
      primaryContactSuccessModal: false,
    })
    dispatch(fetchPhoneNumbers(activeAccountId))
  }

  const closePrimarynumberStatusModal = () => {
    updateEditState({
      primaryContactStatusModal: false,
    })
  }
  if (isPhoneDataLoading) {
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
          {phoneNumbersLabel?.value}
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
      {sortedPhoneNumbers?.map((data: any, index: any) => {
        const { formattedNumber, isPrimary, id, type } = data
        const isVerified = data?.verified
        return (
          <ContactDetail
            key={`contact-phone-details-${index}`}
            id={id}
            value={formattedNumber}
            isPrimary={isPrimary}
            isVerified={isVerified}
            editState={editState}
            updateEditState={updateEditState}
            setPrimaryContact={setPrimaryPhone}
            removeContact={removePhoneNumber}
            type={type}
          />
        )
      })}
      {isEditing && (
        <EditcontactInfo
          editState={editState}
          updateEditState={updateEditState}
          changePrimaryLabel={changePrimaryNumberLabel?.value}
          doneButtonLabel={doneButtonLabel?.value}
          addNewItemLabel={AddNumberLabel?.value}
          type="phone"
          hasVerifiedContact={hasVerifiedContact}
          showChangePrimary={sortedPhoneNumbers.length > 0}
        />
      )}
      {verifyContact && (
        <VerifyPhone
          contactId={verifyContactId}
          contactValue={verifyContactValue}
          isContactPrimary={verifyContactPrimary}
          updateEditState={updateEditState}
        />
      )}
      <ActionModal
        isOpen={primaryContactSuccessModal}
        handleClose={closeAndUpdatePrimarynumberSuccessModal}
        className={classes.modalRoot}
        info={
          <div className={classes.rootSuccess}>
            <Typography
              tagType="h4"
              styleType="h4"
              className={classes.modalTitle}
            >
              {primarySuccessPhoneTitle?.value}
            </Typography>
            <Typography styleType="h6" fontType="regularFont">
              {primarySuccessPhoneSubTitle?.value}
            </Typography>
          </div>
        }
        primaryBtnText={verifyNumber?.targetItem?.okButton?.value}
        primaryBtnAction={closeAndUpdatePrimarynumberSuccessModal}
      />
      <ActionModal
        isOpen={primaryContactStatusModal}
        handleClose={closePrimarynumberStatusModal}
        className={classes.modalRoot}
        info={
          <div className={classes.rootSuccess}>
            <Typography
              tagType="h4"
              className={classes.modalTitle}
              styleType="h4"
            >
              {noVerifiedPhoneTitle?.value}
            </Typography>
            <Typography styleType="h6" fontType="regularFont">
              {noVerifiedPhoneSubTitle?.value}
            </Typography>
          </div>
        }
        primaryBtnText={verifyNumber?.targetItem?.okButton?.value}
        primaryBtnAction={closePrimarynumberStatusModal}
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
    gap: '2rem',
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

export default PhoneNumbers
