import React, { useState } from 'react'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
import QuestionIconFilled from '@/shared-ui/react-icons/question-icon-filled'
import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@/shared-ui/components'
import { Dropdown } from 'src/ui-kit'
import { maskEmail } from 'src/utils/register'
import { useAppData, usePageLoadEvents } from 'src/hooks'
import { formatUrl } from 'src/utils/urlHelpers'
import { FORGOT_ID_PAGES } from 'src/constants'

const ForgotMultipleEmails = ({ userEmail, setUserSelectedEmail }: any) => {
  usePageLoadEvents({
    shouldTriggerDTMEvent: true,
    eventData: {
      pageName: FORGOT_ID_PAGES.MULTIPLE_EMAIL_DROPDOWN_PAGE,
    },
  })
  const forgotMultipleEmails = useAppData('forgotMultipleEmails', true) || {}
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobile = width <= 768
  const [isLoading] = useState(false)
  const [selecteEmail, setSelectedEmail] = useState({
    label: forgotMultipleEmails.selectEmail?.value,
    value: forgotMultipleEmails.selectEmail?.value,
  })

  const handleChange = (event: any) => {
    setSelectedEmail(event)
  }

  return (
    <div className={classes.container}>
      {!isMobile && (
        <div className={classes.iconSection}>
          <QuestionIconFilled />
        </div>
      )}
      <div className={classes.titleSection}>
        <Typography tagType="h2" styleType="h3">
          {forgotMultipleEmails.title?.value}
        </Typography>
      </div>
      <div className={classes.contentSection}>
        <div className={classes.descriptionSection}>
          <Typography fontType="regularFont" styleType="p1" tagType="p">
            {forgotMultipleEmails.description?.value}
          </Typography>
        </div>

        <div className={classes.dropdownSection}>
          <Dropdown
            value={selecteEmail}
            options={userEmail?.map((email: any) => {
              return {
                label: maskEmail(email),
                value: email,
              }
            })}
            onChange={handleChange}
            className={classes.fogotDropdown}
          />
        </div>

        <div className={classes.buttonSection}>
          <Button
            type="button"
            variant="primary"
            text={forgotMultipleEmails.submit?.value}
            hoverVariant="primary"
            onClick={() => setUserSelectedEmail(selecteEmail?.value)}
            disabled={
              selecteEmail.value === forgotMultipleEmails.selectEmail?.value
            }
            isBusy={isLoading}
          />
        </div>

        {!isMobile && (
          <div className={classes.bottomSection}>
            <Typography tagType="span" fontType="mediumFont" styleType="p3">
              {forgotMultipleEmails.dontNeedaReminder?.value}
            </Typography>
            <Typography
              fontType="boldFont"
              styleType="p3"
              tagType="span"
              className={classes.signIn}
            >
              <a href={`${formatUrl(forgotMultipleEmails.signUrl?.value)}`}>
                {forgotMultipleEmails.signInBtn?.value}
              </a>
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.grey,
  },
  container: {
    backgroundColor: colors.main.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSection: {
    width: '100%',
    [breakpoints.up('sm')]: {
      width: 499,
    },
  },
  iconSection: {
    padding: 16,
    margin: 0,
    [breakpoints.up('sm')]: {
      padding: '0 0 32px 0',
      margin: 0,
    },
  },
  titleSection: {
    padding: '0 0 16px 0',
    margin: 0,
    [breakpoints.up('sm')]: {
      padding: '0 0 32px 0',
      margin: 0,
    },
  },
  descriptionSection: {
    '& p': {
      padding: '0 0 16px 0',
      margin: 0,
      [breakpoints.up('sm')]: {
        padding: '0 0 32px 0',
        margin: 0,
      },
    },
  },
  dropdownSection: {
    padding: 0,
  },
  fogotDropdown: {
    width: '100%',
    marginBottom: 32,
    '& svg': {
      color: '#141928',
      width: 24,
      height: 24,
      borderRadius: 0,
      margin: '5px 12px',
    },
    '& .menu-item': {
      marginLeft: 8,
      [breakpoints.up('sm')]: {
        marginLeft: 10,
      },
    },
    '& .control': {
      borderColor: 'green',
    },
  },
  buttonSection: {
    '& button': {
      margin: 'auto',
      display: 'flex',
      [breakpoints.up('sm')]: {
        display: 'flex',
        margin: 'auto auto 32px auto',
      },
    },
  },
  bottomSection: {
    textAlign: 'center',
    '& span': {
      display: 'inline-block',
      marginRight: 10,
    },
  },
  email: {
    margin: '0 0 32px 0',
  },
  description: {
    width: '100%',
    marginTop: 0,
    [breakpoints.up('sm')]: {
      width: 499,
    },
  },
  signIn: {
    textDecoration: 'underline',
  },
}))

export default ForgotMultipleEmails
