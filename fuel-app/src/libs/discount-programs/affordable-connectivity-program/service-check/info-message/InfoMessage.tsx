import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { WarningOutline, ThanksCheckMark } from '@/shared-ui/react-icons'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { State } from 'src/redux/types'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { scrollToTop } from 'src/utils/register'

interface ThanksMessageProps {
  componentName: string
}

const InfoMessage = ({ componentName }: ThanksMessageProps) => {
  const classes = useStyles()
  const {
    statusTitle,
    contentVisibleFlag,
    iconName,
    statusContent,
    ...errorMessages
  } = useAppData(componentName, true)
  const {
    enrollmentIssueTitle,
    enrollmentIssueDescription,
    needsResubmissionEB004Title,
    needsResubmissionEB004Description,
    needsToBeUpdatedTitle,
    needsToBeUpdatedDescription,
    needsResubmissionEB003Title,
    needsResubmissionEB003Description,
    needsValidationTitle,
    needsValidationDescription,
  } = errorMessages || {}
  const apiErrorData = useSelector((state: State) => state?.acp?.apiErrorData)

  useEffect(() => {
    scrollToTop()
  }, [])

  if (!statusTitle || !contentVisibleFlag || !iconName || !statusContent) {
    return null
  }

  const getContent = () => {
    const isEnrollmentIssue =
      apiErrorData?.errorCode === 'EB016' ||
      apiErrorData?.errorCode === 'EB017' ||
      apiErrorData?.errorCode === 'EB018'
    const isNeedsValidation =
      apiErrorData?.errorCode === 'EB020' ||
      apiErrorData?.errorCode === 'EB006' ||
      apiErrorData?.errorCode === 'EB021' ||
      apiErrorData?.errorCode === 'EB022'
    switch (true) {
      case iconName?.value !== 'error':
        return {
          title: statusTitle?.value,
          description: null,
        }
      case isEnrollmentIssue:
        return {
          title: enrollmentIssueTitle?.value,
          description: enrollmentIssueDescription?.value,
        }
      case apiErrorData?.errorCode === 'EB004':
        return {
          title: needsResubmissionEB004Title?.value,
          description: needsResubmissionEB004Description?.value,
        }
      case apiErrorData?.errorCode === 'EB019':
        return {
          title: needsToBeUpdatedTitle?.value,
          description: needsToBeUpdatedDescription?.value,
        }
      case apiErrorData?.errorCode === 'EB003':
        return {
          title: needsResubmissionEB003Title?.value,
          description: needsResubmissionEB003Description?.value,
        }
      case isNeedsValidation:
        return {
          title: needsValidationTitle?.value,
          description: needsValidationDescription?.value,
        }
      default:
        return {
          title: needsResubmissionEB004Title?.value,
          description: needsResubmissionEB004Description?.value,
        }
    }
  }

  const { title, description } = getContent()

  return (
    <section
      className={clx(classes.root, {
        [classes.errorBackground]: iconName?.value === 'error',
      })}
    >
      <div
        className={clx(classes.imgClass, {
          [classes.imgClassSuccessIcon]: iconName?.value !== 'error',
        })}
      >
        {iconName?.value === 'error' ? (
          <WarningOutline className={classes.icon} />
        ) : (
          <ThanksCheckMark className={classes.icon} />
        )}
      </div>
      <InjectHTML
        tagType="h3"
        styleType="h4"
        className={clx(classes.title, {
          [classes.successTitle]: iconName?.value !== 'error',
        })}
        value={title}
      />
      {contentVisibleFlag.value === true && description && (
        <InjectHTML
          className={classes.contentStyle}
          tagType="div"
          value={description}
        />
      )}
    </section>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    padding: '5.313rem 5.5rem',
    flexDirection: 'column',
    alignItems: 'center',
    background: colors.main.dark,
    borderRadius: '2rem',
    margin: '8.125rem auto 5.625rem auto',
    [theme.breakpoints.down('sm')]: {
      padding: '3.125rem  1rem',
      margin: '4.063rem 1rem',
    },
  },
  errorBackground: {
    background: colors.main.newBackgroundGray,
  },
  imgClass: {
    width: '2.5rem',
    margin: '0px auto 1rem auto',
    [theme.breakpoints.down('sm')]: {
      width: '2.188rem',
    },
  },
  icon: {
    height: 48,
    width: 48,
    [theme.breakpoints.down('xs')]: {
      height: 32,
      width: 32,
    },
    '& path': {
      fill: colors.main.brightRed,
    },
  },
  imgClassSuccessIcon: {
    '& svg': {
      '& path': {
        fill: colors.main.greenishBlue,
      },
    },
  },
  title: {
    letterSpacing: '-0.02em',
    textAlign: 'center',
    color: colors.main.dark,
    maxWidth: 800,
    [theme.breakpoints.down('sm')]: {
      letterSpacing: '-0.01em',
    },
  },
  successTitle: {
    color: colors.main.white,
  },
  contentStyle: {
    '& a': {
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      textDecoration: 'underline',
      '&:hover': { color: colors.main.brightRed },
    },
    fontSize: '1.13rem',
    lineHeight: '1.5rem',
    margin: 'auto',
    width: '100%',
    maxWidth: 800,
    marginTop: 32,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
}))

export default InfoMessage
