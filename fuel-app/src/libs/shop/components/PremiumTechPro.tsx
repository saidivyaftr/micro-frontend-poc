import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import {
  Typography,
  ImagePerk,
  Button,
  InfoModal,
  TooltipPopover,
} from '@/shared-ui/components'
import { RightArrowIcon, InfoIconWhite } from '@/shared-ui/react-icons'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import FrontierSecureModal from './FrontierSecureModal'
import { useEffect, useState } from 'react'
import {
  FRONTIER_SECURE_PREMIUMTECHPRO,
  MAX_WIDTH,
  SITE_INTERACTION,
} from 'src/constants'
import { IShopComponents } from './types'

const PremiumTechPro = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    TabletImage,
    subTitle,
    title,
    price,
    description,
    priceCurrency,
    priceFrequency,
    limitedOfferTitle,
    limitedOfferDescription,
    linkText,
    tooltip,
    iconImage,
    modalContent,
    modalChatBtnText,
    modalCallBtnText,
    modalCallBtnUrl,
  } = useAppData('contentBlockWithPrice', true)

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto'
  }, [isModalOpen])

  if (!title) {
    return null
  }
  return (
    <div id="premium-techPro" className={classes.root} style={styles}>
      <ImagePerk
        backgroundColor="black"
        backgroundColorContent="white"
        stripeColor="secondary"
        contentClassName={classes.contentContainer}
        className={classes.container}
        content={
          <>
            {iconImage?.src && (
              <div>
                <img className={classes.headIcon} src={iconImage?.src} alt="" />
              </div>
            )}
            <Typography styleType="h4" tagType="h4" className={classes.title}>
              {title?.value}
            </Typography>
            <Typography tagType="h4" styleType="h4" className={classes.heading}>
              {subTitle?.value}
            </Typography>
            <Typography
              className={classes.paragraphStyle}
              tagType="p"
              styleType="p1"
            >
              {description?.value}
            </Typography>
            <div className={classes.priceContainer}>
              {price && (
                <div>
                  <p className={classes.price}>
                    <Typography
                      styleType="h3"
                      tagType="p"
                      className={classes.priceCurrency}
                    >
                      <span>
                        {priceCurrency?.value}
                        {priceFrequency?.value}
                      </span>
                    </Typography>
                    <Typography
                      styleType="h6"
                      tagType="p"
                      className={classes.priceFrequency}
                    >
                      {price?.value}
                    </Typography>
                  </p>
                </div>
              )}
            </div>
            {limitedOfferTitle && (
              <div className={classes.limitedOfferContainer}>
                <>
                  <Typography
                    styleType="p1"
                    tagType="p"
                    color="tertiary"
                    fontType="boldFont"
                    className={classes.limitedOfferTitle}
                  >
                    {limitedOfferTitle?.value}
                  </Typography>
                  <Typography
                    styleType="p1"
                    tagType="p"
                    color="tertiary"
                    className={classes.limitedOfferDescription}
                  >
                    {limitedOfferDescription?.value}
                  </Typography>
                  {tooltip?.value && (
                    <TooltipPopover
                      tooltipContent={tooltip.value}
                      tooltipIcon={<InfoIconWhite />}
                      dropShadow={false}
                    />
                  )}
                </>
              </div>
            )}
            <Button
              type="link"
              text={
                <>
                  {linkText?.value}
                  <RightArrowIcon />
                </>
              }
              className={classes.linkContainer}
              hoverVariant="primary"
              variant="lite"
              triggerEvent={true}
              eventObj={{
                events: 'event14',
                eVar14: `${FRONTIER_SECURE_PREMIUMTECHPRO}:model-opened`,
              }}
              interactionType={SITE_INTERACTION}
              onClick={() => {
                setIsModalOpen(true)
              }}
            />
          </>
        }
        tabletBackgroundImage={TabletImage ?? {}}
      />
      <InfoModal
        isOpen={isModalOpen}
        isLoading={false}
        className={classes.modalContentWrapper}
        onClose={() => {
          setIsModalOpen(false)
        }}
        modalContentClassName={classes.modalContent}
      >
        <FrontierSecureModal
          content={modalContent?.value}
          modalChatBtnText={modalChatBtnText?.value}
          modalCallBtnText={modalCallBtnText?.value}
          modalCallBtnUrl={modalCallBtnUrl?.value}
          onClose={() => setIsModalOpen(false)}
          ObjectId={FRONTIER_SECURE_PREMIUMTECHPRO}
        />
      </InfoModal>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    '& div:nth-child(2)': {
      alignSelf: 'flex-end',
    },
  },
  headIcon: {
    color: colors.main.dark,
    height: '40px',
    width: 'auto',
    [breakpoints.down('xs')]: {
      height: '26.6px',
      width: 'auto',
    },
  },
  container: {
    maxWidth: '77rem',
  },
  contentContainer: {
    marginLeft: '1rem',
    borderRadius: '2rem',
  },
  paragraphStyle: {
    margin: '8px 0',
  },
  heading: {
    marginBottom: 16,
  },
  title: {
    paddingTop: '2rem',
    [breakpoints.down('xs')]: {
      paddingTop: '1.125rem',
    },
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
  price: {
    margin: 0,
    display: 'inline-flex',
  },
  priceContainer: {
    [breakpoints.down('sm')]: {
      padding: '0px',
      display: 'flex',
      justifyContent: 'flex-start',
    },
  },
  priceCurrency: {
    margin: '0 !important',
    fontSize: '56px',
    lineHeight: '64px',
    verticalAlign: '50%',
    [breakpoints.down('sm')]: {
      fontSize: typography.pxToRem(30),
      lineHeight: typography.pxToRem(38),
    },
  },
  priceFrequency: {
    position: 'relative',
    top: 30,
    [breakpoints.down('sm')]: {
      top: 10,
    },
  },
  limitedOfferTitle: {
    display: 'inline',
    marginBottom: 0,
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      fontFamily: 'PP Object Sans bold',
    },
  },
  limitedOfferDescription: { display: 'inline' },
  limitedOfferContainer: {
    margin: '0.5rem 0 2rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      marginBottom: '1rem',
    },
  },
  linkContainer: {
    display: 'unset !important',
    alignItems: 'center',
    fontFamily: PP_OBJECT_SANS,
    '& svg': {
      width: 16,
      height: 10,
    },
    gap: '0.625rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
}))

export default PremiumTechPro
