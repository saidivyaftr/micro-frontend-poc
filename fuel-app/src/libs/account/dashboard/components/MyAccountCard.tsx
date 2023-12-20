import { makeStyles } from '@material-ui/core'
import { Typography, Tooltip } from 'src/blitz'
import InfoIconWhite from 'src/blitz/assets/react-icons/info-icon-white'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import { myAccountCardData, DashboardData } from '../mockData'
import colors from '@/shared-ui/colors'
import { Skeleton, Button } from '@/shared-ui/components'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import clx from 'classnames'
import { WarningOutline } from '@/shared-ui/react-icons'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { useEffect, useState } from 'react'
import VerifyEmail from 'src/libs/account/shared/VerifyEmail'
import VerifyPhone from 'src/libs/account/shared/VerifyPhone'

type ContentItemProps = {
  title: string
  description: string | JSX.Element | undefined
  tooltipText?: string
  isVerified?: boolean
  id?: string
  type?: string
}

const ContentItem = ({
  title,
  description = '',
  tooltipText = '',
  isVerified = true,
  id = '',
  type = '',
}: ContentItemProps) => {
  const classes = useContentItemStyles()
  const initialstate = {
    isSettingPrimary: false,
    isAddingNewContactItem: false,
    verifyContact: false,
    verifyContactValue: '',
    verifyContactId: '',
    verifyContactPrimary: false,
    hasApiFailed: false,
  }
  const [editState, setEditState] = useState(initialstate)
  const {
    verifyContact,
    verifyContactValue,
    verifyContactId,
    verifyContactPrimary,
  } = editState
  const [isBtnDisabled, setBtnDisable] = useState(false)
  const updateEditState = (update: any) => {
    setEditState((prevObject) => ({
      ...prevObject,
      ...update,
    }))
  }
  const triggerOtpVerification = (id: string, value: string) => {
    updateEditState({
      verifyContact: true,
      verifyContactId: id,
      verifyContactValue: value,
      hasApiFailed: false,
    })
  }
  useEffect(() => {
    if (!verifyContact) {
      setBtnDisable(false)
    }
  }, [verifyContact])
  return (
    <div className={classes.verifyContent}>
      <Typography styleType="p2" fontType="boldFont">
        <div className={classes.titleWrapper}>
          <div>{title}</div>
          {tooltipText && (
            <Tooltip
              dropShadow
              tooltipClassName={classes.tooltip}
              tooltipText={tooltipText}
              tooltipIcon={<InfoIconWhite />}
              variant="new-design"
            />
          )}
        </div>
      </Typography>
      <Typography styleType="p2" className={clx(classes.descriptionText)}>
        <>{description}</>
      </Typography>
      {!isVerified && (
        <div className={clx(classes.verifyItemSection)}>
          <div className={classes.contactRowItem}>
            <WarningOutline color={colors.main.brightRed} />
          </div>
          <Button
            type="button"
            buttonSize="small"
            variant="lite"
            className={clx(classes.link, classes.contactRowItem)}
            text={'verify'}
            disabled={isBtnDisabled}
            onClick={async () => {
              triggerOtpVerification(id, description.toString())
              setBtnDisable(true)
            }}
          ></Button>
        </div>
      )}
      {verifyContact && (
        <>
          {type === 'Email' && (
            <VerifyEmail
              contactId={verifyContactId}
              contactValue={verifyContactValue}
              isContactPrimary={verifyContactPrimary}
              updateEditState={updateEditState}
            />
          )}
          {type === 'Mobile' && (
            <VerifyPhone
              contactId={verifyContactId}
              contactValue={verifyContactValue}
              isContactPrimary={verifyContactPrimary}
              updateEditState={updateEditState}
            />
          )}
        </>
      )}
    </div>
  )
}

const useContentItemStyles = makeStyles(({ breakpoints }) => ({
  invalidErrorMsg: {
    color: colors.main.errorRed,
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
  link: {
    fontFamily: PP_OBJECT_SANS,
    fontSize: '.875rem',
    lineHeight: '1.125rem',
    textDecoration: 'underline',
    padding: 0,
    width: 'fit-content',
    height: 'fit-content',
    minWidth: 'fit-content',
  },
  verifyItemSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '.5rem',
    [breakpoints.down('xs')]: {
      width: 'calc(100% - 72px)',
      marginLeft: 'auto',
      marginTop: 4,
    },
  },
  contactRowItem: {
    margin: 0,
    textTransform: 'capitalize',
    '& svg': {
      width: 20,
      height: 20,
    },
  },
  verifyContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  titleWrapper: {
    width: '72px',
  },
  tooltip: {
    marginTop: '3px',
  },
  descriptionText: {
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
    width: 'calc(100% - 140px)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [breakpoints.down('xs')]: {
      width: 'calc(100% - 72px)',
    },
  },
}))

type MyAccountCardProps = {
  firstName: string
  lastName: string
  contents: ContentItemProps[]
  className?: string
  isloading: boolean
  isError: boolean
}

const MyAccountCard = ({
  firstName,
  lastName,
  contents,
  className = '',
  isloading,
  isError,
}: MyAccountCardProps) => {
  const css = useStyles()
  const reduceUserName = `${firstName[0] || ''}${
    lastName[0] || ''
  }`.toUpperCase()
  return (
    <CardWithTitle
      title={myAccountCardData?.headerLabel?.value}
      labelLink={myAccountCardData?.linkLabel?.value}
      url={myAccountCardData?.linkUrl?.href}
      className={className}
      styleType="h6"
    >
      {isloading ? (
        <MyAccountCardSkeleton />
      ) : isError ? (
        <>
          <ErrorMessage
            message={DashboardData?.somethingWentWrong?.value}
            styleType="p2"
            className={css.errorWrapper}
          />
        </>
      ) : (
        <>
          <section className={css.contentName}>
            <div className={css.avatar}>
              <Typography
                className={css.avatarText}
                styleType="h5"
                fontType="regularBandwidthFont"
              >
                {reduceUserName}
              </Typography>
            </div>
            <div className={css.nameDescription}>
              <Typography styleType="h5">{`${firstName} ${lastName}`}</Typography>
              <Typography styleType="p3">
                {myAccountCardData?.primaryAccountOwner?.value}
              </Typography>
            </div>
          </section>
          <div className={css.content}>
            {contents.map((content) => (
              <div className={css.item} key={content.title}>
                <ContentItem
                  title={content.title}
                  description={content.description}
                  tooltipText={content.tooltipText}
                  isVerified={content.isVerified}
                  id={content.id}
                  type={content.type}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </CardWithTitle>
  )
}

const MyAccountCardSkeleton = () => {
  return (
    <div>
      <Skeleton width={'70%'} height={30} />
      <Skeleton width={'80%'} height={90} />
      <Skeleton width={'60%'} height={30} />
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }) => ({
  item: { width: '100%' },
  avatar: {
    width: '4.5rem',
    height: '4.5rem',
    background: colors.main.black,
    borderRadius: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.main.greenishBlue,
  },
  contentName: {
    padding: '2rem 0',
    display: 'flex',
    gridTemplateColumns: '5rem auto',
    alignItems: 'center',
    gap: '.5rem',
  },
  nameDescription: {
    display: 'flex',
    flexDirection: 'column',
    gap: '.25rem',
  },
  content: {
    display: 'grid',
    gridGap: '1rem 0.5rem',
    // gridTemplateColumns: '4.5rem auto',
    paddingBottom: 32,
    [breakpoints.down('xs')]: {
      padding: '0.5rem 0',
    },
  },
  errorWrapper: {
    paddingTop: '1.5rem',
  },
}))

export default MyAccountCard
