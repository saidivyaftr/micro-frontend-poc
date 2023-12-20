import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Edit, WarningOutline } from 'src/blitz/assets/react-icons'
import { Button, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import APIClient from 'src/api-client'
import { Dropdown } from 'src/ui-kit'
import { accountSlice } from 'src/redux/slicers/account'
import { useDispatch } from 'react-redux'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { SITE_ERROR } from 'src/constants'

const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'ENG' },
  { label: 'Español', value: 'SPA' },
]

const LanguagePreference = ({
  accountNumber,
  language,
  preferredLanguageEditable,
}: {
  accountNumber: string
  language: string
  preferredLanguageEditable?: boolean
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const accountInformationData = useAppData('accountInformationData', true)
  const [editLanguage, setEditLanguage] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [lang, setLang] = useState(language)

  const cancelEdit = () => {
    setEditLanguage(false)
    setShowError(false)
    setLang(language)
  }

  const saveEdit = async () => {
    setIsBusy(true)
    try {
      setShowError(false)
      await APIClient.updateAccountDetails(accountNumber, {
        preferredLanguageCode: lang,
      })
      dispatch(accountSlice.actions.setLanguagePreference(lang))
      setEditLanguage(false)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'my profile:account information:update language preference',
        },
        'tl_o',
        'my profile:account information:update language preference',
      )
    } catch (error) {
      setShowError(true)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'my profile:account information:update language preference',
          eVar88: 'Failed to update language preference',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    setIsBusy(false)
  }

  const selectedValue =
    lang === 'ENG' ? LANGUAGE_OPTIONS[0] : LANGUAGE_OPTIONS[1]

  return (
    <div>
      {editLanguage ? (
        <div className={classes.editSection}>
          <Typography
            styleType="p2"
            fontType="boldFont"
            className={classes.sectionItem}
          >
            {accountInformationData?.languagePreference?.value}
          </Typography>
          <Typography styleType="p2" className={classes.sectionItem}>
            {accountInformationData?.languagePreferenceEditMessage?.value}
          </Typography>
          <Dropdown
            value={selectedValue}
            options={LANGUAGE_OPTIONS}
            onChange={({ value }: any) => setLang(value)}
          />
          <Typography styleType="p4" className={classes.sectionItem}>
            {accountInformationData?.languageDisclaimer?.value}
          </Typography>
          {showError && (
            <div className={classes.invalidError}>
              <WarningOutline />
              <Typography
                className={classes.invalidErrorMsg}
                fontType="mediumFont"
              >
                {accountInformationData?.errorUpdatingLanguage?.value}
              </Typography>
            </div>
          )}
          <div className={classes.actionBtnContainer}>
            <Button
              type="button"
              variant="secondary"
              buttonSize="small"
              isBusy={isBusy}
              loadingVariant="white"
              text={accountInformationData?.saveBtn?.value}
              className={classes.btn}
              onClick={saveEdit}
            />
            <Button
              type="button"
              variant="lite"
              buttonSize="small"
              className={classes.cancelBtn}
              onClick={cancelEdit}
              disabled={isBusy}
              text={accountInformationData?.cancelBtn?.value}
            />
          </div>
        </div>
      ) : (
        <div>
          <Typography
            styleType="p2"
            fontType="boldFont"
            className={classes.sectionItem}
          >
            <span className={classes.editContainer}>
              {accountInformationData?.languagePreference?.value}
              {preferredLanguageEditable !== false && (
                <button
                  className={classes.showHideBtn}
                  onClick={() => setEditLanguage(true)}
                >
                  <Edit />
                </button>
              )}
            </span>
          </Typography>
          <Typography styleType="p2">{selectedValue?.label}</Typography>
        </div>
      )}
    </div>
  )
}
export default LanguagePreference

const useStyles = makeStyles(() => ({
  sectionItem: {
    marginBottom: 8,
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
    gap: 8,
  },
  editSection: {
    background: colors.main.secondaryLight,
    padding: 16,
    borderRadius: 16,
    margin: '0px -8px',
  },
  btn: {
    maxWidth: 120,
    minWidth: 120,
    marginRight: 16,
    padding: 0,
  },
  cancelBtn: {
    fontFamily: PP_OBJECT_SANS,
    textDecoration: 'underline',
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  actionBtnContainer: {
    marginTop: 32,
    display: 'flex',
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
}))
