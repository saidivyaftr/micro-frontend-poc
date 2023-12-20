import { Grid, makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData, useChatState } from 'src/hooks'

const FeatureSection = ({ className = '' }: { className?: any }) => {
  const bannerData = useAppData('productBanner', true)
  const { setChatState } = useChatState()
  const classes = useStyles()
  const getPhoneNumber = (number = '') => `+${number.replace(/\./g, '')}`
  return (
    <section className={`${classes.root} ${className}`}>
      <Grid container className={classes.container}>
        <Grid item md={7} lg={6} sm={12} xs={12}>
          <article>
            <div>
              <InjectHTML
                className={classes.title}
                tagType="h3"
                styleType="h3"
                testId="title"
                fontType="regularFont"
                value={bannerData?.title?.value}
              />
              <Typography
                className={classes.subtitle}
                tagType="h3"
                styleType="h3"
                testId="subtitle"
                fontType="regularFont"
              >
                {bannerData?.subtitle?.value || ''}
              </Typography>
              <div className={classes.priceAndPeriodContainer}>
                <Typography className={classes.tagLine} testId="caption">
                  {bannerData?.startingAtCapion?.value || ''}
                </Typography>
                {!!bannerData?.price?.value && (
                  <div className={classes.priceGroup}>
                    <Typography className={classes.priceValue} testId="price">
                      <>
                        <sup className={classes.priceSuperScript}>$</sup>
                        <span>{bannerData?.price?.value || ''}</span>
                        <sup
                          data-testid="decimal"
                          className={classes.decimalSuperScript}
                        >
                          {bannerData?.decimalValue?.value || ''}
                        </sup>
                      </>
                    </Typography>
                    <Typography
                      testId="period"
                      className={classes.priceDecimalValue}
                    >
                      {bannerData?.period?.value || ''}
                    </Typography>
                  </div>
                )}
                <Typography className={classes.tagLine} testId="note">
                  {bannerData?.note?.value || ''}
                </Typography>
              </div>
              <div className={classes.callChatSectionWrapper}>
                <a
                  className={classes.callSection}
                  href={`tel:${
                    getPhoneNumber(bannerData?.callNumber?.value) || ''
                  }`}
                >
                  <img
                    className={classes.callIcon}
                    src={bannerData?.callIcon?.value}
                    alt="phone icon"
                    data-testid="callIcon"
                    loading="lazy"
                  />
                  <Typography
                    className={`${classes.callChatSectionText}  ${classes.marginToLeft}`}
                    fontType="boldFont"
                    testId="callNumber_Title"
                  >
                    <>
                      {bannerData?.callTitle?.value || ''}{' '}
                      {bannerData?.callNumber?.value || ''}
                    </>
                  </Typography>
                </a>
                <button
                  onClick={() => setChatState(true)}
                  className={classes.chatSection}
                >
                  <img
                    className={classes.chatIcon}
                    src={bannerData?.chatIcon?.value}
                    alt="chat icon"
                    data-testid="chatIcon"
                    loading="lazy"
                  />
                  <Typography
                    className={classes.callChatSectionText}
                    fontType="boldFont"
                    testId="chatTitle"
                  >
                    {bannerData?.chatTitle?.value || ''}
                  </Typography>
                </button>
              </div>
            </div>
          </article>
        </Grid>
        <Grid item md={5} lg={6} sm={12} xs={12} className={classes.hideForSm}>
          {bannerData?.sectionImage?.value && (
            <figure className={classes.cardImageFig}>
              <img
                src={bannerData?.sectionImage?.value}
                alt={bannerData?.sectionImage?.alt}
                data-testid="sectionImage"
                loading="lazy"
              />
            </figure>
          )}
        </Grid>
      </Grid>
    </section>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginTop: 72,
    marginBottom: 16,
    maxWidth: 1200,
    padding: '0px 16px',
  },
  title: {
    fontSize: 36,
    lineHeight: 1.1,
    paddingBottom: 10,
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
    '& sup': {
      fontSize: '0.35em',
      position: 'relative',
      top: '-5px',
    },
  },
  subtitle: {
    fontSize: 24,
    lineHeight: '1.1',
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  tagLine: {
    fontSize: 12,
  },
  container: {
    padding: '32px 40px',
    border: `1px solid ${colors.main.borderLightGray}`,
    [theme.breakpoints.down('lg')]: {
      padding: '20px 30px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      border: 'none',
    },
  },
  cardImageFig: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  priceSuperScript: {
    fontSize: 20,
    marginRight: '2px',
    marginLeft: '0px',
    position: 'absolute',
    left: -14,
    top: -12,
  },
  decimalSuperScript: {
    fontSize: 20,
    marginRight: '2px',
    marginLeft: '0px',
    position: 'absolute',
    right: -3,
    top: -12,
  },
  priceGroup: {
    display: 'inline-block',
    position: 'relative',
    height: 60,
    marginTop: 16,
    marginLeft: 14,
  },
  priceValue: {
    fontSize: 52,
    display: 'inline-block',
  },
  priceDecimalValue: {
    display: 'inline-block',
    position: 'relative',
    fontSize: '0.8rem',
  },
  callChatSectionWrapper: {
    display: 'flex',
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  callSection: {
    display: 'flex',
    padding: '8px 0px',
  },
  chatSection: {
    display: 'flex',
    padding: '8px',
    border: 0,
    cursor: 'pointer',
    background: 'transparent',
  },
  callChatSectionText: {
    fontWeight: 600,
    padding: '0px 3px',
    marginLeft: 2,
    marginTop: -4,
    fontSize: 18,
    '&:hover': {
      textDecoration: 'none !important',
    },
  },
  marginToLeft: {
    marginLeft: 4,
  },
  priceAndPeriodContainer: {
    marginTop: 12,
  },
  hideForSm: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  callIcon: {
    height: 14,
    width: 14,
    marginTop: -4,
  },
  chatIcon: {
    height: 14,
    width: 14,
  },
}))

export default FeatureSection
