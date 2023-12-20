/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { TStore } from 'src/redux/Store'
import APIClient from '../../../api-client'
import { AppRoutes } from 'src/constants/appRoutes'
import { useAppData } from 'src/hooks'
import { makeStyles, withStyles, Checkbox } from '@material-ui/core'
import {
  Loading,
  InfoModal,
  Button,
  Typography,
  InjectHTML,
  TooltipPopover,
} from '@/shared-ui/components'
import { InfoIconWhite } from '@/shared-ui/react-icons'
import {
  COMPONENT_WRAPPER,
  PADDING,
  MAX_WIDTH,
  CTA_YTTV_ACCEPT_TERMS_CONDITIONS,
  CTA_YTTV_SHOW_TERMS_AND_CONDITIONS,
  CTA_YTTV_GOOGLE_TRY_ANOTHER,
  YTTV_REGISTRATION_PAGE,
  CUSTOMER,
  SERVICEABLE,
} from 'src/constants'
import colors from 'src/styles/theme/colors'
import { useSession, signIn } from 'next-auth/react'
import TermsAndConditionsModal from './TermsAndConditionsModal'
import { ActivationHero, ErrorHero } from 'src/libs/youtubetv'
import {
  yttvCtaClickHandler,
  yttvPageLoadAnalytics,
} from '../shared/AnalyticsUtlis'

const CheckboxWithRedCheck = withStyles({
  root: {
    '& .MuiSvgIcon-root': {
      fill: colors.main.white,
    },
    '&$checked': {
      '& .MuiIconButton-label': {
        position: 'relative',
        zIndex: 0,
      },
      '& .MuiSvgIcon-root': {
        fill: colors.main.white,
      },
      '& .MuiIconButton-label:after': {
        content: '""',
        left: 4,
        top: 4,
        height: 15,
        width: 15,
        position: 'absolute',
        backgroundColor: colors.main.brightRed,
        zIndex: -1,
      },
    },
  },
  checked: {},
})(Checkbox)
export interface OfferProps {
  recordType: string
  subscriptionId: string
  vendor: string
  status: string
  externalProductId: string
  billingDescription: string
  billableAmount: number
  activateDate: string
  billingStartDate: string
  addOns?: Array<Record<string, unknown>>
  changeTimestamp: string
  createTimestamp: string
  parentSubscriptionId?: string
  productName: string
}

const initOffer: OfferProps = {
  recordType: '',
  subscriptionId: '',
  vendor: '',
  status: '',
  externalProductId: '',
  billingDescription: '',
  billableAmount: 0,
  activateDate: '',
  billingStartDate: '',
  addOns: [],
  changeTimestamp: '',
  createTimestamp: '',
  parentSubscriptionId: '',
  productName: '',
}

const OfferHero = () => {
  const {
    heading,
    headingAlt,
    termsCta,
    descriptionAlt,
    primaryButton,
    primaryButtonAlt,
    secondaryButtonAlt,
    //secondaryButton,
    //primaryButtonDesc,
    //termsModalTitleTwo,
    //termDescriptionTwo,
    //modalButton,
    termsModalTitle,
    termDescription,
    toolTip,
  }: any = useAppData('offerHero', true)

  const { data: session } = useSession()
  const { yttvOffers } = useSelector((state: TStore) => state.yttv)
  const [showLoader, setLoader] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [errCode, setErrCode] = useState<any>('')
  //const [decline, setDecline] = useState<boolean>(false)
  const [acceptTerms, setTerms] = useState<boolean>(false)
  const [offerEligible, setEligible] = useState<boolean>(true)
  const [offerDescription, setOfferrDescription] = useState<string>('')
  const [activeOffer, setActiveOffer] = useState<OfferProps>(initOffer)
  const [activated, setActivated] = useState<boolean>(false)
  const [openModal, setModalOpen] = useState<boolean>(false)
  const [openTermsOnce, setTermsOnce] = useState<boolean>(true)
  const [SPANISH, setSpanish] = useState<boolean>(false)
  const router = useRouter()
  const classes = useStyles()()

  useEffect(() => {
    setError(false)
    if (yttvOffers && yttvOffers?.data?.offers?.length > 0) {
      setLoader(false)
      setActivated(false)
      if (
        yttvOffers?.data?.offers[0]?.productName.toUpperCase() === 'SPANISH'
      ) {
        setSpanish(true)
        setEligible(true)
      } else setEligible(yttvOffers?.data?.originalOfferEligibile)
    }
    if (yttvOffers?.error === false && yttvOffers?.data?.offers?.length === 0) {
      setActivated(true)
    } else {
      if (yttvOffers?.error) {
        const errCode = yttvOffers?.data?.message
        setErrCode(errCode?.substring(errCode?.length - 3))
        setError(true)
      }
    }
  }, [yttvOffers])

  useEffect(() => {
    if (yttvOffers && yttvOffers?.data?.offers?.length > 0) {
      setOfferrDescription(generateOfferText())
    }
  }, [offerEligible, yttvOffers, SPANISH])

  useEffect(() => {
    if (activeOffer && activeOffer.status === 'ACTIVE') {
      router.push(AppRoutes.YoutubeTvConfirmationPage)
    }
  }, [activeOffer])

  useEffect(() => {
    const eventData = {
      pageName: YTTV_REGISTRATION_PAGE.replace(
        '{NAME}',
        offerEligible ? 'eligible' : 'non-eligible',
      ),
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
    }
    yttvPageLoadAnalytics(eventData)
  }, [offerEligible])

  useEffect(() => {
    const eventData = {
      pageName: YTTV_REGISTRATION_PAGE.replace(
        '{NAME}',
        activated ? 'activated' : '',
      ),
      eVar22: CUSTOMER,
      eVar49: SERVICEABLE,
    }
    if (activated) yttvPageLoadAnalytics(eventData)
  }, [activated])

  const generateOfferText = () => {
    const freeTrial = yttvOffers?.data?.offers[0]?.freeTrial
    const days = yttvOffers?.data?.offers[0]?.freeTrialDurationDays
    const promotionLength = yttvOffers?.data?.offers[0]?.promotionLength
    const discount = yttvOffers?.data?.offers[0]?.discountAmount
    const standardPrice = yttvOffers.data.offers[0]?.billableAmount
    const discountedPrice = (
      yttvOffers.data.offers[0]?.billableAmount + discount
    ).toFixed(2)

    let strAlt = `<p>It looks like this Google account had YouTube TV in the past.</p><p>You can still sign up at the standard price of <span>$${standardPrice}/mo</span>. Or, try another Google account to see if you qualify for special savings`
    strAlt +=
      discount > 0
        ? ` of $${Math.abs(discount)}/mo. for ${promotionLength} months.</p>`
        : '.'
    let activationString = `Activate your account and enjoy YouTube TV `
    activationString += SPANISH ? `Spanish ` : ``
    activationString += freeTrial
      ? `free for <span>${days}</span> days.<br />`
      : `now.<br /> `

    activationString += freeTrial ? `Then pay ` : `Pay`
    activationString += SPANISH
      ? ` <span>$${standardPrice}</span>/mo. + taxes.`
      : ` just <span>$${discountedPrice}</span>/mo. + taxes for 12 months.`

    let output = ''
    if (offerEligible || SPANISH) {
      output = activationString
    } else if (!offerEligible && !SPANISH) {
      output = strAlt
    }

    return output
  }

  const generateTermsText = () => {
    const discount = yttvOffers?.data?.offers[0]?.discountAmount

    const str = termDescription?.value?.replace(/XX/g, Math.abs(discount))

    return str
  }

  const activateOffer = async () => {
    yttvCtaClickHandler(
      YTTV_REGISTRATION_PAGE.replace(
        '{NAME}',
        offerEligible ? 'eligible' : 'not-eligible',
      ),
      'hero',
      offerEligible ? primaryButton?.value : primaryButtonAlt?.value,
    )
    try {
      setError(false)
      setLoader(true)
      const subscriptionid = yttvOffers?.data?.offers[0]?.subscriptionId
      const payload = { customerBearerToken: session?.token?.accessToken }

      const response = await APIClient.activateSubscription(
        subscriptionid,
        payload,
      )
      setActiveOffer(response.data)
    } catch (err: any) {
      const errCode = err?.message
      setErrCode(errCode?.substring(errCode?.length - 3))
      setError(true)
    }
  }

  const openTerms = () => {
    if (openTermsOnce)
      yttvCtaClickHandler(
        YTTV_REGISTRATION_PAGE.replace(
          '{NAME}',
          offerEligible ? 'eligible' : 'non-eligible',
        ),
        'hero',
        CTA_YTTV_SHOW_TERMS_AND_CONDITIONS,
      )
    setModalOpen(true)
    setTermsOnce(false)
  }

  const checkAccept = () => {
    yttvCtaClickHandler(
      YTTV_REGISTRATION_PAGE.replace(
        '{NAME}',
        offerEligible ? 'eligible' : 'non-eligible',
      ),
      'hero',
      `${CTA_YTTV_ACCEPT_TERMS_CONDITIONS}:${
        !acceptTerms ? 'checked' : 'unchecked'
      }`,
    )
    setTerms(!acceptTerms)
  }

  // const cancelOffer = async () => {
  //   setDecline(true)
  //   setModalOpen(true)
  // }

  // const declineOffer = async () => {
  //   try {
  //     const subscriptionid = yttvOffers?.data?.offers[0]?.subscriptionId
  //     await APIClient.cancelSubscription(subscriptionid)
  //     setModalOpen(false)
  //     signOut()
  //     router.push('/')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  return activated ? (
    <ActivationHero activated={true} spaPageName={'activated'} />
  ) : error ? (
    <ErrorHero errCode={errCode} spaPageName={'error'} />
  ) : (
    <>
      <InfoModal
        isOpen={openModal}
        isLoading={false}
        className={classes.modalContentWrapper}
        onClose={() => {
          setModalOpen(false)
        }}
        modalContentClassName={classes.modalContent}
      >
        {openModal && (
          <TermsAndConditionsModal
            title={termsModalTitle.value}
            content={generateTermsText()}
            onClose={() => setModalOpen(false)}
          />
        )}

        {/* {openModal && decline && (
          <TermsAndConditionsModal
            title={termsModalTitleTwo.value}
            content={termDescriptionTwo.value}
            onClose={() => declineOffer()}
            cta={true}
            ctaButton={modalButton}
          />
        )} */}
      </InfoModal>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div className={classes.content}>
            {showLoader ? (
              <div className={classes.loader}>
                <Loading className={classes.loading} />
              </div>
            ) : (
              <>
                <div className={classes.mainContent}>
                  {offerEligible && heading?.value ? (
                    <Typography
                      tagType="h1"
                      styleType="h1"
                      fontType="boldFont"
                      color="tertiary"
                      className={classes.heading}
                    >
                      {heading?.value}
                    </Typography>
                  ) : (
                    <InjectHTML
                      tagType="h1"
                      styleType="h1"
                      fontType="boldFont"
                      color="tertiary"
                      className={classes.heading}
                      value={headingAlt?.value}
                    />
                  )}
                  {!offerEligible && descriptionAlt?.value && (
                    <InjectHTML
                      tagType="h6"
                      styleType="h6"
                      color="tertiary"
                      fontType="boldFont"
                      className={classes.offerDescription}
                      value={offerDescription}
                    />
                  )}
                  <div className={classes?.subContent}>
                    {offerDescription && offerEligible && (
                      <>
                        <h6 className={classes.offerDescription}>
                          <InjectHTML
                            pureInjection={true}
                            tagType="span"
                            //styleType="h6"
                            color="tertiary"
                            //className={classes.offerDescription}
                            value={offerDescription}
                            //enableClick={true}
                            //onClick={() => !offerEligible && activateOffer()}
                          />
                          {!SPANISH && (
                            <sup>
                              <TooltipPopover
                                dropShadow={false}
                                tooltipIcon={<InfoIconWhite />}
                                tooltipContent={toolTip?.value}
                                tooltipClassName={classes.tooltip}
                              />
                            </sup>
                          )}
                        </h6>
                      </>
                    )}
                    <div className={classes?.termsContainer}>
                      <CheckboxWithRedCheck
                        checked={acceptTerms}
                        onChange={checkAccept}
                        name="Terms and conditions"
                      />
                      <span className={classes?.terms} onClick={openTerms}>
                        {termsCta?.value}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    type="button"
                    text={
                      offerEligible
                        ? primaryButton?.value
                        : primaryButtonAlt?.value
                    }
                    onClick={activateOffer}
                    hoverVariant="secondary"
                    className={classes.compareButton}
                    disabled={!acceptTerms}
                  />
                  {!offerEligible && (
                    <Button
                      type="button"
                      text={secondaryButtonAlt?.value}
                      onClick={() => {
                        yttvCtaClickHandler(
                          YTTV_REGISTRATION_PAGE.replace(
                            '{NAME}',
                            'not-eligible',
                          ),
                          'hero',
                          CTA_YTTV_GOOGLE_TRY_ANOTHER,
                        )
                        signIn('google')
                      }}
                      variant="tertiary"
                      hoverVariant="secondary"
                      className={classes.tryButton}
                    />
                  )}

                  {/* <Button
                    type="button"
                    text={secondaryButton.value}
                    onClick={() => cancelOffer()}
                    variant="secondary"
                    style={{ borderColor: 'white' }}
                    hoverVariant="secondary"
                    className={classes.compareButton}
                  /> */}
                  {/*
                  {offerEligible && (
                    <span className={classes.primaryButtonDesc}>
                      {primaryButtonDesc.value}
                    </span>
                  )} */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const useStyles = () =>
  makeStyles(({ breakpoints }) => ({
    root: {
      backgroundColor: colors.main.midnightExpress,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50vw',
      backgroundSize: '58vw',
      minHeight: '34.5rem',
      position: 'relative',
      [breakpoints.down('sm')]: {
        minHeight: '0',
        backgroundPosition: 'calc(100%) 100%',
        backgroundSize: '105vw',
        backgroundPositionX: 60,
      },
      [breakpoints.down('xs')]: {
        backgroundSize: '104vw',
        backgroundPositionX: 20,
      },
      ['@media screen and (min-width: 1441px)']: {
        backgroundSize: 720,
        backgroundPositionY: 107,
      },
    },
    wrapper: {
      ...COMPONENT_WRAPPER,
      margin: 'auto',
      padding: `6rem ${PADDING}px`,
      [breakpoints.down('md')]: {
        padding: `3rem ${PADDING}px`,
      },
      [breakpoints.down('xs')]: {
        padding: `1.5rem ${PADDING}px`,
      },
    },
    heading: {
      textTransform: 'none',
      marginBottom: '0.5rem',
    },
    offerDescription: {
      fontSize: '24px',
      lineHeight: '32px',
      textTransform: 'none',
      marginBottom: '1rem',
      fontFamily: 'PP Object Sans Bold',
      color: colors.main.white,
      '& > :first-child': {
        color: colors.main.white,
      },
      '& span': {
        color: colors.main.blue,
      },
      '& u': {
        cursor: 'pointer',
      },
      '& p': {
        maxWidth: '90% !important',
        fontFamily: 'PP Object Sans',
        [breakpoints.down('xs')]: {
          maxWidth: 'unset !important',
        },
      },
    },
    content: {
      [breakpoints.down('md')]: {
        margin: '1.75rem 0',
      },
    },
    mainContent: {
      position: 'relative',
      marginBottom: '2rem',
      '& p': {
        maxWidth: '550px',
      },
    },
    compareButton: {
      width: '300px',
      display: 'inline-block',
      marginBottom: '20px',
      marginRight: '40px',
      paddingLeft: 0,
      paddingRight: 0,
    },
    tryButton: {
      width: '300px',
      display: 'inline-block',
      marginBottom: '20px',
      marginRight: '40px',
      paddingLeft: 0,
      paddingRight: 0,
      color: colors.main.white,
      borderColor: colors.main.white,
    },
    primaryButtonDesc: {
      color: colors.main.white,
      display: 'block',
      fontSize: '14px',
      width: '300px',
      textAlign: 'center',
    },
    termsContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    checkTerms: {
      boxSizing: 'border-box',
      cursor: 'pointer',
      width: '25px',
      height: ' 25.08px',
      backgroundColor: '#2D3548',
      border: '1px solid #898C93',
      borderRadius: '4px',
    },
    terms: {
      color: 'white',
      cursor: 'pointer',
      textDecoration: 'underline',
      paddingLeft: '5px',
    },
    loader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContentWrapper: { padding: '0 1rem' },
    modalContent: {
      maxWidth: MAX_WIDTH,
      padding: '5.5rem',
      width: 'unset',
      [breakpoints.down('sm')]: {
        padding: '2rem',
      },
      margin: '8vh auto',
    },
    loading: {
      margin: 0,
      width: 'auto',
      height: 'auto',
      display: 'block',
      padding: '150px 0',
      ['@media screen and (max-width: 900px)']: {
        padding: '100px 0',
      },
    },
    subContent: {
      width: '900px',
      ['@media screen and (max-width: 900px)']: {
        width: 'auto',
      },
      marginTop: '20px',
      marginBottom: '20px',
    },
    errMessage: {
      '& div': { color: colors.main.white },
      '& path': { fill: colors.main.white },
    },
    tooltip: {
      display: 'inline',
      '& path': { fill: colors.main.white },
    },
  }))

export default OfferHero
