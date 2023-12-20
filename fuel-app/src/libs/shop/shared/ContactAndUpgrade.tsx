import { Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useAppData, useChatState } from 'src/hooks'
import colors from '@/shared-ui/colors'
import clx from 'classnames'

const ContactAndUpgrade: React.FC = () => {
  const classes = useStyles()
  const { setChatState } = useChatState()
  const bannerData = useAppData('contactDetails', true)
  const getPhoneNumber = (number = '') => `+${number.replace(/\./g, '')}`

  return (
    <div className={classes.root}>
      <Typography
        className={classes.sectionTitle}
        styleType="h3"
        tagType="h3"
        fontType="regularFont"
        testId="sectionTitle"
      >
        {bannerData?.sectionTitle?.value || ''}
      </Typography>
      <div className={classes.callChatSectionWrapper}>
        <a
          className={classes.callSection}
          data-testid="callUrl"
          href={`tel:${getPhoneNumber(bannerData?.callNumber?.value) || ''}`}
        >
          <img
            className={classes.contactTypeIcon}
            src={bannerData?.callIcon?.value}
            alt="phone icon"
            data-testid="callIcon"
            loading="lazy"
          />
          <Typography
            className={clx(
              classes.callChatSectionText,
              classes.marginToLeft,
              classes.callChatSectionTextCall,
            )}
            styleType="h5"
            testId="callTitle_Number"
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
          data-testid="chatUrl"
        >
          <img
            src={bannerData?.chatIcon?.value}
            alt="chat icon"
            className="chatIcon"
            data-testid="chatIcon"
            loading="lazy"
          />
          <div className={classes.callChatSectionText}>
            <Typography styleType="h5" testId="chatTitle">
              {bannerData?.chatTitle?.value || ''}
            </Typography>
          </div>
        </button>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    borderTop: `1px solid ${colors.main.borderLightGray}`,
    padding: '35px 0',
    minHeight: '158px',
    clear: 'both',
    background: colors.main.lightGray,
    color: colors.main.midnightExpress,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 300,
  },
  callChatSectionWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  callSection: {
    display: 'flex',
  },
  chatSection: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '12px',
    border: 0,
    cursor: 'pointer',
    background: 'transparent',
    '& img': {
      width: 20,
      height: 20,
    },
  },
  callChatSectionText: {
    fontWeight: 600,
    padding: '0px 3px',
    fontSize: 24,
    marginLeft: 4,
    color: colors.main.textGray,
  },
  callChatSectionTextCall: {
    color: colors.main.midnightExpress,
    cursor: 'pointer',
  },
  marginToLeft: {
    marginLeft: 4,
  },
  contactTypeIcon: {
    width: 20,
    height: 20,
    marginTop: -4,
    marginRight: 4,
    objectFit: 'contain',
  },
}))

export default ContactAndUpgrade
