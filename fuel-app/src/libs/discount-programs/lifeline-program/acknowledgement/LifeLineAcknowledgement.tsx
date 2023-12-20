import colors from '@/shared-ui/colors'
import Skeleton from '@/shared-ui/components/Skeleton'
import { Button, Checkbox, RichText, Typography } from '@/shared-ui/components'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Dictionary } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  COMPONENT_WRAPPER,
  LIFELINE_PROGRAM_ACKNOWLEDGEMENT_PAGE,
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

const LifeLineAcknowledgement = () => {
  const styles = useStyles()
  const { btnText, tosTypesList, participationTosType } = useAppData(
    'LifeLineAcknowledgement',
    true,
  )
  const dispatch = useDispatch()
  const { query, isReady } = useRouter()
  const { a: accountUuid } = query
  const [isChecked, setIsChecked] = useState(false)
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

  const [allowedTOSStates, setAllowedTOSStates] = useState<TosState[]>([])

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
    if (payload.length > 0) {
      DTMClient.triggerEvent(
        {
          events: 'event2, event14',
          eVar2: LIFELINE_PROGRAM_ACKNOWLEDGEMENT_PAGE,
          eVar14: btnText?.value?.toLowerCase(),
        },
        'tl_o',
        SITE_INTERACTION,
      )
      dispatch(updateTosStatus(accountUuid, payload, 'lifeline'))
    }
  }

  const accept = () => {
    allowedTOSStates.forEach((x) => (x.accepted = !x.accepted))
    setAllowedTOSStates([...allowedTOSStates])
    if (!isChecked) {
      setIsChecked(true)
      DTMClient.triggerEvent(
        {
          events: 'event68',
          eVar68: `${LIFELINE_PROGRAM_ACKNOWLEDGEMENT_PAGE}:accept terms and conditions`,
        },
        'tl_o',
        SITE_INTERACTION,
      )
    }
  }

  const shownTos =
    allowedTOSStates.length > 1
      ? allowedTOSStates.filter((i) => i.tosType === participationTosType.value)
      : allowedTOSStates

  return (
    <div className={styles.root}>
      <div className={styles.innerWrapper}>
        {shownTos.length > 0 ? (
          <>
            {shownTos.map((tosState) => (
              <>
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
                      accept()
                    }}
                    name="Agree"
                    className={styles.consentInput}
                  />
                  <Typography tagType="span" styleType="p1">
                    {tosState.checkboxText}
                  </Typography>
                </div>
              </>
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

export default LifeLineAcknowledgement
