import { Typography, Card, Skeleton } from 'src/blitz'
import { makeStyles } from '@material-ui/core'
import { AddSolid, LinkOutline } from '@/shared-ui/react-icons/index'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { useAccountList } from 'src/selector-hooks'
import {
  LinkedAccountRow,
  LinkedAccountRowHeader,
} from './LinkedAccountRowDesktop'
import { LinkedAccountRowMobile } from './LinkedAccountRowMobile'
import { ActionModal } from 'src/libs/account/shared/modals'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { AppRoutes, SITE_ERROR } from 'src/constants'
import APIClient from 'src/api-client'
import { fetchAccounts } from 'src/redux/slicers/account'
import { useDispatch } from 'react-redux'
import colors from '@/shared-ui/colors'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import useAppData from '@/shared-ui/hooks/useAppData'

export const LinkedAccounts = () => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const linkedAccountsData = useAppData('linkedAccountsData', true)
  const errorMessages = useAppData('errorMessages', true)

  const [unlinkId, setUnlinkId] = useState<string | null>(null)
  const { isLoading, data, error } = useAccountList()

  const [isBusyUnlinking, setIsBusyUnlinking] = useState(false)
  const [hasErrorUnlinking, setHasErrorUnlinking] = useState(false)

  const queryAccountId = router?.query?.account
    ? `${router?.query?.account}`
    : undefined

  const renderDesktopView = () => {
    if (data?.length > 0) {
      return (
        <div className={classes.table}>
          <LinkedAccountRowHeader />
          {data?.map((account) => (
            <LinkedAccountRow
              setUnlinkId={setUnlinkId}
              account={account}
              key={`account-${account.id}`}
            />
          ))}
        </div>
      )
    }
    return null
  }

  const renderMobileView = () => {
    if (data?.length > 0) {
      return data?.map((account) => (
        <LinkedAccountRowMobile
          account={account}
          setUnlinkId={setUnlinkId}
          key={`account-mobile-${account.accountNumber}`}
        />
      ))
    }
    return null
  }

  const handleUnlinkId = async () => {
    if (!unlinkId) {
      return null
    }
    setIsBusyUnlinking(true)
    try {
      setHasErrorUnlinking(false)
      await APIClient.deleteService(unlinkId)
      dispatch(fetchAccounts(queryAccountId, true, true))
      setUnlinkId(null)

      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: 'account access:unlink account',
        },
        'tl_o',
        'account access:unlink account',
      )
    } catch (error) {
      setHasErrorUnlinking(true)
      DTMClient.triggerEvent(
        {
          events: 'event88',
          eVar2: 'account access:unlink account',
          eVar88: 'Failed to unlink account',
        },
        'tl_o',
        SITE_ERROR,
      )
    }
    setIsBusyUnlinking(false)
  }

  return (
    <Card>
      <div>
        <Typography styleType="h5" className={classes.title}>
          <>
            <LinkOutline height={32} width={32} />
            <span>{linkedAccountsData?.title.value}</span>
          </>
        </Typography>
        {isLoading ? (
          <LinkedAccountsSkeleton />
        ) : error ? (
          <ErrorMessage message={errorMessages?.fetchFailed?.value} />
        ) : (
          <>
            <Typography>{linkedAccountsData?.description?.value}</Typography>
            <div className={classes.desktopView}>{renderDesktopView()}</div>
            <div className={classes.mobileView}>{renderMobileView()}</div>
            {data?.length === 0 && (
              <Typography className={classes.noLinkedAccounts}>
                {linkedAccountsData?.noLinkedAccounts?.value}
              </Typography>
            )}
            <div
              className={classes.addNewBtn}
              onClick={() => {
                router.push(AppRoutes.LinkAccount)

                DTMClient.triggerEvent(
                  {
                    events: 'event14',
                    eVar14: 'account access:link account',
                  },
                  'tl_o',
                  'account access:link account',
                )
              }}
            >
              <Typography styleType="p2" fontType="boldFont">
                <span className={classes.addNewInnerContainer}>
                  <AddSolid height={48} width={48} />
                  {linkedAccountsData?.linkAccount?.value}
                </span>
              </Typography>
            </div>
          </>
        )}
        <ActionModal
          showCloseButton={false}
          isOpen={Boolean(unlinkId)}
          title={linkedAccountsData?.unlinkAccountModalTitle?.value}
          subTitle={linkedAccountsData?.unlinkAccountModalDescription?.value}
          isPrimaryBusy={isBusyUnlinking}
          primaryBtnText={linkedAccountsData?.unlink?.value}
          primaryBtnAction={handleUnlinkId}
          secondaryBtnText={linkedAccountsData?.cancel?.value}
          secondaryBtnAction={() => {
            setUnlinkId(null)
            setHasErrorUnlinking(false)
          }}
          disclaimer={
            hasErrorUnlinking && (
              <Typography color="primary">
                {linkedAccountsData?.somethingWentWrong?.value}
              </Typography>
            )
          }
        />
      </div>
    </Card>
  )
}

const LinkedAccountsSkeleton = () => {
  const classes = useStyles()
  return (
    <div>
      <Skeleton width={'40%'} />
      <div className={classes.table}>
        <Skeleton height={30} width={'90%'} />
        <Skeleton height={80} width={'90%'} />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  title: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  table: {
    marginTop: 32,
  },
  noLinkedAccounts: {
    margin: '32px 0',
  },
  addNewBtn: {
    cursor: 'pointer',
    marginTop: 16,
  },
  addNewInnerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    '&:hover': {
      color: colors.main.brightRed,
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  desktopView: {
    display: 'block',
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  mobileView: {
    display: 'none',
    margin: '24px 0',
    [breakpoints.down('xs')]: {
      display: 'block',
    },
  },
}))
