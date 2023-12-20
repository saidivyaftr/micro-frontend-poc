import { useEffect, useMemo, useState } from 'react'
import { Skeleton, Typography } from 'src/blitz'
import Card from '@/shared-ui/components/Card/Card'
import { makeStyles } from '@material-ui/core'
import { AccountIconSqaure } from '@/shared-ui/react-icons'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { PeopleCard } from './PeopleCard'
import { ActionModal } from 'src/libs/account/shared/modals'
import {
  useAccountList,
  useSelectAccountUsers,
  useSessionState,
} from 'src/selector-hooks'
import APIClient from 'src/api-client'
import { useDispatch } from 'react-redux'
import { fetchUsersLinkedToAccount } from 'src/redux/slicers/accountAccess'
import { User } from 'src/redux/types/accountAccessTypes'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import useAppData from '@/shared-ui/hooks/useAppData'
import { SITE_ERROR } from 'src/constants'

export const People = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const peopleCard = useAppData('peopleCard', true)
  const errorMessages = useAppData('errorMessages', true)

  const [removeAccountId, setRemoveAccountId] = useState<string | null>(null)
  const [isRemovingPerson, setIsRemovingPerson] = useState(false)
  const [isRemovePersonFailed, setIsRemovePersonFailed] = useState(false)

  const {
    serviceId,
    isLoading: accountUsersLoading,
    errorFetching: errorFetchingUsers,
    data,
  } = useSelectAccountUsers()
  const { isLoading: accountListLoading, error: errorFetchingAccountList } =
    useAccountList()
  const { data: sessionData } = useSessionState()

  useEffect(() => {
    if (removeAccountId) {
      setIsRemovingPerson(false)
      setIsRemovePersonFailed(false)
    }
  }, [removeAccountId])

  const handleRemovePerson = async () => {
    if (serviceId && removeAccountId) {
      setIsRemovingPerson(true)
      setIsRemovePersonFailed(false)
      try {
        await APIClient.deleteUserLinkedToService(serviceId, removeAccountId)
        dispatch(fetchUsersLinkedToAccount(serviceId))
        setRemoveAccountId(null)

        DTMClient.triggerEvent(
          {
            events: 'event14',
            eVar14: 'account access:remove user',
          },
          'tl_o',
          'account access:remove user',
        )
      } catch (error) {
        setIsRemovePersonFailed(true)
        DTMClient.triggerEvent(
          {
            events: 'event88',
            eVar2: 'account access:remove user',
            eVar88: 'Failed to remove user',
          },
          'tl_o',
          SITE_ERROR,
        )
      }
      setIsRemovingPerson(false)
    }
  }

  const isLoading = accountUsersLoading || accountListLoading

  const errorFetching = errorFetchingUsers || errorFetchingAccountList

  const primaryAccountUUID = useMemo(() => {
    if (data?.length === 0) {
      return null
    }
    if (data?.length === 1) {
      return data[0].uid
    }
    return (
      data.find((item) => item.loginId === sessionData?.frontierId?.email) ||
      data[0].uid
    )
  }, [data, sessionData])

  return (
    <Card>
      <div>
        <Typography styleType="h5" className={classes.title}>
          <>
            <AccountIconSqaure height={32} width={32} />
            <span>
              {peopleCard?.title.value}{' '}
              <span>{data?.length > 0 ? `(${data.length})` : ''}</span>
            </span>
          </>
        </Typography>
        {isLoading ? (
          <PeopleSkeleton />
        ) : errorFetching ? (
          <ErrorMessage message={errorMessages?.fetchFailed?.value} />
        ) : (
          <>
            <Typography>{peopleCard?.description?.value}</Typography>
            <div className={classes.cardsContainer}>
              {data?.map((item: User) => {
                const fullName = [item.firstName, item.lastName]
                  .filter(Boolean)
                  .join(' ')
                return (
                  <PeopleCard
                    key={`people-card-${item.uid}`}
                    uid={item.uid}
                    fullName={fullName}
                    email={item.email ?? '-'}
                    isPrimaryAccount={primaryAccountUUID === item.uid}
                    handleRemoveAccount={setRemoveAccountId}
                  />
                )
              })}
            </div>
          </>
        )}
        <ActionModal
          showCloseButton={false}
          isOpen={Boolean(removeAccountId)}
          title={peopleCard?.removePersonModalTitle?.value}
          subTitle={peopleCard?.removePersonModalDescription?.value}
          primaryBtnText={peopleCard?.remove?.value}
          primaryBtnAction={handleRemovePerson}
          secondaryBtnText={peopleCard?.cancel?.value}
          secondaryBtnAction={() => setRemoveAccountId(null)}
          isPrimaryBusy={isRemovingPerson}
          disclaimer={
            isRemovePersonFailed && (
              <Typography color="primary" styleType="p3">
                {peopleCard?.somethingWentWrong?.value}
              </Typography>
            )
          }
        />
      </div>
    </Card>
  )
}

const PeopleSkeleton = () => {
  const classes = useStyles()
  return (
    <div className={classes.cardsContainer}>
      <Skeleton className={classes.skeleton} />
      <Skeleton className={classes.skeleton} />
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
  cardsContainer: {
    display: 'flex',
    gap: 16,
    marginTop: 32,
    flexWrap: 'wrap',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  skeleton: {
    margin: 0,
    borderRadius: 8,
    height: '236px !important',
    width: '240px !important',
    [breakpoints.down('xs')]: {
      height: '116px !important',
      width: '100% !important',
    },
  },
}))
