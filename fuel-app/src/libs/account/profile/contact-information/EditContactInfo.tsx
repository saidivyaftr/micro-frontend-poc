import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@/shared-ui/components'
import clx from 'classnames'
import { editDetailInfo } from './types'
import { LeftRightArrow, Add } from 'src/blitz/assets/react-icons'
import AddEmailAddress from './AddEmailAddress'
import AddPhoneNumber from './AddPhoneNumber'
import colors from '@/shared-ui/colors'

const EditContactInfo = (props: editDetailInfo) => {
  const classes = useStyles()

  const {
    updateEditState,
    changePrimaryLabel,
    doneButtonLabel,
    addNewItemLabel,
    editState,
    type = 'phone',
    hasVerifiedContact,
    showChangePrimary,
  } = props

  const { isSettingPrimary, isAddingNewContactItem } = editState

  const setPrimaryContact = () => {
    if (hasVerifiedContact) {
      updateEditState({
        isSettingPrimary: true,
        verifyContact: false,
        hasApiFailed: false,
      })
    } else {
      updateEditState({
        primaryContactStatusModal: true,
      })
    }
  }

  const addNewContact = () => {
    updateEditState({
      isAddingNewContactItem: true,
      verifyContact: false,
      hasApiFailed: false,
    })
  }

  const resetEditFrom = () => {
    updateEditState({
      isEditing: false,
      isSettingPrimary: false,
      isAddingNewContactItem: false,
      verifyContact: false,
      verifyContactValue: '',
      verifyContactId: '',
      verifyContactPrimary: false,
      hasApiFailed: false,
    })
  }

  return (
    <>
      {!isSettingPrimary && !isAddingNewContactItem && (
        <>
          {showChangePrimary && (
            <div
              className={clx(classes.sectionItem, classes.editButtonWrapper)}
            >
              <LeftRightArrow
                width="1.125rem"
                height="1.125rem"
                color="black"
              />
              <Button
                type="link"
                buttonSize="small"
                variant="lite"
                className={classes.editButton}
                text={
                  <Typography styleType="p2" fontType="boldFont">
                    {changePrimaryLabel}
                  </Typography>
                }
                onClick={setPrimaryContact}
              ></Button>
            </div>
          )}
          <div className={clx(classes.sectionItem, classes.editButtonWrapper)}>
            <Add width="12px" height="12px" color={colors.main.black} />
            <Button
              type="link"
              buttonSize="small"
              variant="lite"
              className={classes.editButton}
              text={
                <Typography styleType="p2" fontType="boldFont">
                  {addNewItemLabel}
                </Typography>
              }
              onClick={addNewContact}
            ></Button>
          </div>
        </>
      )}
      {isAddingNewContactItem &&
        (type === 'phone' ? (
          <AddPhoneNumber
            editState={editState}
            updateEditState={updateEditState}
          />
        ) : (
          <AddEmailAddress
            editState={editState}
            updateEditState={updateEditState}
          />
        ))}
      <div className={classes.sectionItem}>
        <Button
          buttonSize="small"
          text={doneButtonLabel}
          className={classes.doneButton}
          type="link"
          variant="secondary"
          onClick={resetEditFrom}
        />
      </div>
    </>
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
  editButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '.5rem',
    alignItems: 'center',
  },

  editButton: {
    height: '1.5rem',
    [breakpoints.down('xs')]: {
      height: '1.125rem',
    },
  },
  doneButton: {
    maxWidth: 'fit-content',
    minWidth: 'fit-content',
  },
}))
export default EditContactInfo
