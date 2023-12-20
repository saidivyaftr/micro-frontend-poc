import colors from '@/shared-ui/colors'
import Skeleton from '@/shared-ui/components/Skeleton'
import { Checkbox, Button, RichText, Typography } from '@/shared-ui/components'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Dictionary } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ACP_ACKNOWLEDGEMENT_PAGE,
  COMPONENT_WRAPPER,
  SITE_INTERACTION,
} from 'src/constants'
import { useAppData } from 'src/hooks'
import {
  getUserTosStatuses,
  setStep,
  updateTosStatus,
} from 'src/redux/slicers/dpAck'
import { State } from 'src/redux/types'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

type TosState = {
  tosType: string
  title: string
  verbiage: string
  checkboxText: string
  accepted: boolean
}

const ACPAcknowledgement = () => {
  const styles = useStyles()
  const { btnText, tosTypesList } = useAppData('UsageConfirmation', true)
  const dispatch = useDispatch()
  const { query, isReady } = useRouter()
  const { a: accountUuid } = query
  const [isParticipationChecked, setIsParticipationChecked] = useState(false)
  const [isTransferChecked, setIsTransferChecked] = useState(false)
  const [allowedTOSStates, setAllowedTOSStates] = useState<TosState[]>([])

  const statuses = useSelector((state: State) => {
    return state?.dpAck?.userTosStatuses
  })

  useEffect(() => {
    if (accountUuid) {
      dispatch(getUserTosStatuses(accountUuid?.toString() || ''))
    }
    if (isReady && !accountUuid) {
      dispatch(setStep('error'))
    }
  }, [query])

  const allAccepted = useMemo(() => {
    return (
      allowedTOSStates.length > 0 &&
      allowedTOSStates.every((x) => x.accepted == true)
    )
  }, [allowedTOSStates])

  useEffect(() => {
    const allowed = (tosTypesList?.list as any[])?.reduce<Dictionary<any>>(
      (aggr, curr) => {
        aggr[curr.tosType.value] = curr
        return aggr
      },
      {},
    )
    const trackers = statuses
      .filter((status) => !!allowed[status.tosType])
      .map((status) => {
        const config = allowed[status.tosType]
        return {
          tosType: status.tosType,
          title: config.title?.value,
          verbiage: config.verbiage?.value,
          checkboxText: config.checkboxText?.value,
          accepted: false,
        }
      })
    setAllowedTOSStates(trackers)
    if (statuses.length && !trackers.length) {
      dispatch(setStep('error'))
    }
  }, [statuses])

  const onConfirm = async () => {
    const payload = allowedTOSStates
      .filter((x) => x.accepted)
      .map((x) => ({
        type: x.tosType,
        status: 'Accepted',
      }))
    if (payload.length) {
      DTMClient.triggerEvent(
        {
          events: 'event2, event14',
          eVar2: ACP_ACKNOWLEDGEMENT_PAGE,
          eVar14: btnText?.value?.toLowerCase(),
        },
        'tl_o',
        SITE_INTERACTION,
      )
      dispatch(updateTosStatus(accountUuid, payload, 'acp'))
    }
  }

  const triggerEvent = (name: string) => {
    const eventName = `${ACP_ACKNOWLEDGEMENT_PAGE}:${name}`
    DTMClient.triggerEvent(
      {
        events: 'event68',
        eVar68: eventName,
        eVar2: ACP_ACKNOWLEDGEMENT_PAGE,
      },
      'tl_o',
      SITE_INTERACTION,
    )
  }

  const accept = (idx: number) => {
    const newState = [...allowedTOSStates].map((item, index) => {
      if (index !== idx) {
        return item
      }
      return {
        ...item,
        accepted: !item.accepted,
      }
    })
    const isTransfer = newState[idx].title
      .toLocaleLowerCase()
      .includes('transfer')
    if (isTransfer) {
      setIsTransferChecked(true)
      !isTransferChecked && triggerEvent('consent to transfer')
    } else {
      setIsParticipationChecked(true)
      !isParticipationChecked && triggerEvent('accept terms and conditions')
    }
    setAllowedTOSStates(newState)
  }

  return (
    <div className={styles.root}>
      <div className={styles.innerWrapper}>
        {allowedTOSStates.length ? (
          <>
            {allowedTOSStates.map((tosState, idx) => (
              <div className={styles.container} key={'tos-' + idx}>
                {tosState.title && (
                  <Typography
                    styleType="h4"
                    tagType="h4"
                    fontType="boldFont"
                    className={styles.title}
                  >
                    {tosState.title}
                  </Typography>
                )}
                {tosState.verbiage && (
                  <div className={styles.descriptionContainer}>
                    <RichText
                      data={{
                        content: {
                          value: tosState.verbiage,
                        },
                      }}
                      wrapperClassName={styles.richText}
                    />
                  </div>
                )}
                <div className={styles.consentContainer}>
                  <Checkbox
                    checked={tosState.accepted}
                    onChange={() => {
                      accept(idx)
                    }}
                    name="Agree"
                    className={styles.consentInput}
                  />
                  <Typography tagType="span" styleType="p1">
                    {tosState.checkboxText}
                  </Typography>
                </div>
              </div>
            ))}

            <Button
              text={btnText?.value}
              type="submit"
              onClick={onConfirm}
              className={styles.button}
              variant="primary"
              disabled={!accountUuid || !allAccepted}
            />
          </>
        ) : (
          <div className={styles.loadingContainer}>
            <Skeleton height={40} width={650} />
            <div className={styles.loadingContentContainer}>
              <Skeleton height={50} />
              <Skeleton height={295} />
              <Skeleton height={80} />
              <Skeleton height={80} />
              <Skeleton height={25} />
              <Skeleton height={125} />
              <Skeleton height={25} />
            </div>
            <Skeleton height={50} />
            <Skeleton height={50} width={295} />
          </div>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: { background: colors.main.newBackgroundGray },
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    padding: '0 1rem 3rem 1rem',
    maxWidth: '64.5rem',
    margin: 'auto',
    [breakpoints.down('xs')]: {
      padding: '0 1rem 2rem 1rem',
    },
  },
  container: { marginBottom: '1rem' },
  button: {
    width: 265,
    padding: '0rem',
    marginTop: '1rem',
    marginBottom: '2rem',
    [breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '2rem',
    },
  },
  descriptionContainer: {
    background: colors.main.white,
    marginTop: '2rem',
    padding: '2.875rem 4rem 2rem 4rem',
    border: `1px solid ${colors.main.borderGrey}`,
    borderRadius: '2rem',
    [breakpoints.down('xs')]: {
      padding: '1rem 1rem 0 1rem',
    },
  },
  title: {
    textTransform: 'none',
    marginBottom: typography.pxToRem(16),
    paddingTop: '3rem',
  },
  preTitle: {
    textTransform: 'uppercase',
    fontFamily: 'PP_OBJECT_SANS_BOLD',
  },
  richText: {
    padding: 0,
    [breakpoints.down('xs')]: {
      '& p': { fontSize: typography.pxToRem(14) },
    },
  },
  consentContainer: {
    marginTop: '2rem',
    paddingBottom: '1rem',
    display: 'flex',
    alignItems: 'flex-start',
  },
  consentInput: {
    paddingRight: typography.pxToRem(10),
  },
  loadingContainer: {
    padding: '2rem 4rem 4rem 4rem',
  },
  loadingContentContainer: {
    background: colors.main.white,
    borderRadius: 10,
    padding: '1rem 2rem 2rem 2rem',
    marginBottom: '2rem',
  },
}))

export default ACPAcknowledgement
