import { makeStyles } from '@material-ui/styles'
import { Typography, Button, InjectHTML } from '@/shared-ui/components'
import { DownloadIcon } from 'src/blitz/assets/react-icons'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { useCCPAReviews } from 'src/selector-hooks'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import moment from 'moment'

const BASE_URL = process.env.DOTCOM_URL || ''

export const CaliforniaPrivacyLaw = () => {
  const classes = useStyles()
  const { data: reviews } = useCCPAReviews()
  const californiaPrivacyLawData = useAppData('californiaPrivacyLawData', true)
  const reviewCardData = reviews?.[0]

  if (!reviewCardData) {
    return null
  }

  const finalDescription =
    californiaPrivacyLawData?.description?.value?.replace(
      '{{date}}',
      moment(reviewCardData?.date).format('MM/DD/YYYY'),
    )

  return (
    <div>
      <div className={classes.section}>
        <Typography
          styleType="p2"
          fontType="boldFont"
          className={classes.sectionItem}
        >
          {californiaPrivacyLawData?.rightToReviewTitle?.value}
        </Typography>
        <Typography styleType="p2">{finalDescription}</Typography>
      </div>
      <Button
        type="link"
        variant="tertiary"
        href={`${BASE_URL}${reviewCardData?.url}`}
        target="_blank"
        text={
          <span className={classes.downloadBtnInnerContainer}>
            <DownloadIcon className="download-icon" />
            {californiaPrivacyLawData?.download?.value}
          </span>
        }
        className={classes.downloadBtn}
      />
      <div className={classes.legal}>
        <InjectHTML
          styleType="legal"
          value={californiaPrivacyLawData?.legal?.value}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  section: {
    marginBottom: 32,
  },
  sectionItem: {
    marginBottom: 8,
  },
  legal: {
    marginTop: 32,
    '& a': {
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      TextDecoder: 'underline',
    },
  },
  downloadBtn: {
    width: '210px',
    '& .download-icon': {
      marginRight: 8,
      height: 20,
      width: 20,
    },
    '&:hover': {
      '& .download-icon': {
        '& path': {
          fill: colors.main.white,
        },
      },
    },
  },
  downloadBtnInnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  invalidError: {
    display: 'flex',
    gap: 4,
    marginTop: 16,
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
