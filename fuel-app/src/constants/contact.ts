export const stateConstant = {
  SHOW_WELCOME_PAGE: 'SHOW_WELCOME_PAGE',
  SHOW_WELCOME_PAGE_WITH_PHONE: 'SHOW_WELCOME_PAGE_WITH_PHONE',
  SHOW_SECURITY_CODE: 'SHOW_SECURITY_CODE',
  YOU_ALL_SET_PAGE: 'YOU_ALL_SET_PAGE',
  ADD_NEW_MTN: 'ADD_NEW_MTN',
  ADD_NEW_EMAIL: 'ADD_NEW_EMAIL',
  UNABLE_TO_VERIFY: 'UNABLE_TO_VERIFY',
  EMAIL_REMAINDER_PAGE: 'EMAIL_REMAINDER_PAGE',
  SHOW_EMAIL_WELCOME_PAGE: 'SHOW_EMAIL_WELCOME_PAGE',
  SHOW_EMAIL_SECURITY_CODE: 'SHOW_EMAIL_SECURITY_CODE',
  SHOW_VERIFY_CONTACT_EMAIL_PAGE: 'SHOW_VERIFY_CONTACT_EMAIL_PAGE',
  YOU_ALL_SET_EMAIL_PAGE: 'YOU_ALL_SET_EMAIL_PAGE',
}

export const siteInteractionConstant = {
  WELCOME_ADD_MTN: 'Welcome: Add Mobile Number',
  ADD_MTN_TLO: 'Add Number',
  DO_LATER: 'Welcome: I Will Do It Later',
  DO_LATER_TLO: 'Do It Later',
  ADD_MTN: 'Add MTN: Add Mobile Number ',
  UPDATE_MTN: 'Update: Update Mobile Number ',
  UPDATE_MTN_TLO: 'Update Number',
  VERIFY_MTN_NOW: 'Welcome: Verify Now',
  VERIFY_MTN_NOW_TLO: 'Verify Now',
  RESEND_CODE: 'Enter Security Code : Resend Code',
  RESEND_CODE_TLO: 'Resend Code',
  VERIFY_SECURITY_CODE: 'Enter Security Code : Verify Code',
  VERIFY_SECURITY_CODE_TLO: 'Verify Code',

  ADD_NEW_EMAIL: 'Contact-Verification: Add New Email',
  ADD_NEW_EMAIL_TLO: 'Add New Email',
  EDIT_CONTACT_EMAIL: 'Contact-Verification: Edit Contact Email',
  EDIT_CONTACT_EMAIL_TLO: 'Edit Contact Email',
  EDIT_CONTACT_ICON_EMAIL: 'Contact-Verification: Edit Contact Email',
  EDIT_CONTACT_ICON_EMAIL_TLO: 'Edit Contact Email',
  USE_THIS_EMAIL: 'Contact-Verification:Use This Email',
  USE_THIS_EMAIL_TLO: 'Use Email',
  USE_SEPARATE_EMAIL: 'Contact-Verification:Use Separate Contact Email',
  USE_SEPARATE_EMAIL_TLO: 'Use Separate Contact Email',
  USE_SIGNIN_EMAIL: 'Contact-Verification:Use Sign In Email',
  USE_SIGNIN_EMAIL_TLO: 'Use Sign In Email',
  ADD_NEW_CONTACT_EMAIL: 'Contact-Verification:Add New Contact Email',
  ADD_NEW_CONTACT_EMAIL_TLO: 'Add New Contact Email',
  KEEP_CONTACT_EMAIL: 'Contact-Verification:Keep Contact Email',
  KEEP_CONTACT_EMAIL_TLO: 'Keep Contact Email',
  VERIFY_SECURITY_CODE_EMAIL: 'Enter Security Code : Verify Code EMAIL',
  VERIFY_SECURITY_CODE_EMAIL_TLO: 'Verify Code EMAIL',
  DO_LATER_EMAIL: 'Contact-Verification: I Will Do It Later Email',
  DO_LATER_EMAIL_TLO: 'Do It Later',
  RESEND_CODE_EMAIL: 'Enter Security Code : Resend Code Email',
  RESEND_CODE_EMAIL_TLO: 'Resend Code',
  CONTINUE: 'Unable to Verify : Continue',
  CONTINUE_TLO: 'Unable to Verify - Continue',
}

export const prop10Constant = {
  NO_PRIMARY_EMAIL: 'no primary email on record',
  VERIFY_PRIMARY_UNIQUE_EMAIL:
    'primary contact email different than sign-in email',
  VERIFY_PRIMARY_LOGIN_EMAIL: 'primary contact email found but unverified',
  PRIMARY_LOGIN_EMAIL_VERIFIED: 'primary email verified',
  NO_PRIMARY_MTN: 'no mtn on record',
  VERIFY_PRIMARY_MTN: 'mtn found but unverified',
  NO_VERIFICATION_REQUIRED: 'contact information all verified',
}

export const getPageNameForAnalytics = (pageName: string) => {
  const preFix = 'contact-verification/'
  switch (pageName) {
    case stateConstant.SHOW_WELCOME_PAGE:
    case stateConstant.SHOW_WELCOME_PAGE_WITH_PHONE:
    case stateConstant.SHOW_EMAIL_WELCOME_PAGE:
      return `${preFix}start`
    case stateConstant.ADD_NEW_MTN:
      return `${preFix}add-update-mtn`
    case stateConstant.SHOW_SECURITY_CODE:
      return `${preFix}enter-security-code-mtn`
    case stateConstant.YOU_ALL_SET_PAGE:
      return `${preFix}all-set`
    case stateConstant.UNABLE_TO_VERIFY:
      return `${preFix}unable-to-verify`
    case stateConstant.SHOW_EMAIL_SECURITY_CODE:
      return `${preFix}enter-security-code-email`
    case stateConstant.EMAIL_REMAINDER_PAGE:
      return `${preFix}change-contact-email`
    case stateConstant.ADD_NEW_EMAIL:
      return `${preFix}add-update-email`
    case stateConstant.YOU_ALL_SET_EMAIL_PAGE:
      return `${preFix}all-set`
    default:
      return ''
  }
}
