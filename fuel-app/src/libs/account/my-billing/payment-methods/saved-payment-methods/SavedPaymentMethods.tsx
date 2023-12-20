import { Skeleton, Typography } from 'src/blitz'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import { makeStyles } from '@material-ui/core'
import {
  useAccountList,
  useActiveAccount,
  usePaymentMethods,
} from 'src/selector-hooks'
import { AddSolid, Edit } from '@/shared-ui/react-icons'
import { useState } from 'react'
import colors from '@/shared-ui/colors'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import { PaymentMethod } from 'src/redux/types/payments'
import { EditPaymentMethodModal } from './EditPaymentMethodModal'
import { AddNewPaymentContainer } from './add-new-payment'
import { getPaymentMethodLabel } from '../../helper'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import useAppData from '@/shared-ui/hooks/useAppData'

export const SavedPaymentMethods = () => {
  const savedPaymentMethodsData = useAppData('savedPaymentMethodsData', true)
  const errorMessages = useAppData('errorMessages', true)

  const classes = useStyles()
  const [editPaymentDetails, setEditPaymentDetails] =
    useState<null | PaymentMethod>(null)
  const [showAddNewPayment, setShowAddNewPayment] = useState(false)
  const [prevDefaultMethodId, setPrevDefaultMethodId] = useState<string | null>(
    null,
  )

  const { isLoading: isAccountsLoading, error: accountListError } =
    useAccountList()
  const { isLoading: isActiveAccountLoading, error: activeAccountError } =
    useActiveAccount()
  const {
    isLoading: isPaymentMethodsLoading,
    data: paymentMethods,
    error: paymentMethodsError,
  } = usePaymentMethods()

  const isLoading =
    isAccountsLoading || isActiveAccountLoading || isPaymentMethodsLoading

  const hasErrorFetching =
    accountListError || activeAccountError || paymentMethodsError

  return (
    <CardWithTitle
      title={savedPaymentMethodsData?.title.value}
      styleType="h5"
      classNameTitle={classes.title}
    >
      {isLoading ? (
        <SavedPaymentMethodsSkeleton />
      ) : hasErrorFetching ? (
        <ErrorMessage message={errorMessages?.fetchFailed?.value} />
      ) : (
        <div>
          {paymentMethods?.paymentMethods?.map((method) => {
            return (
              <div key={method.id + 'PAY'} className={classes.paymentMethod}>
                <Typography className={classes.editSectionContainer}>
                  <>
                    <span className={classes.selectedPayment}>
                      {getPaymentMethodLabel(method)}
                      {method.default && (
                        <span className={classes.cardStatus}>
                          {savedPaymentMethodsData?.default?.value}
                        </span>
                      )}
                      {method.status === 'EXPIRED' && (
                        <span className={classes.cardStatus}>
                          {savedPaymentMethodsData?.expired?.value}
                        </span>
                      )}
                    </span>
                    {method?.updateable && (
                      <button
                        className={classes.editBtn}
                        onClick={() => setEditPaymentDetails(method)}
                      >
                        <Edit />
                      </button>
                    )}
                  </>
                </Typography>
              </div>
            )
          })}
          {paymentMethods?.paymentMethods?.length === 0 && (
            <Typography className={classes.noSavedPayments}>
              {savedPaymentMethodsData?.noSavedPayments?.value}
            </Typography>
          )}
          <EditPaymentMethodModal
            isOpen={Boolean(editPaymentDetails)}
            handleClose={() => setEditPaymentDetails(null)}
            editPaymentDetails={editPaymentDetails}
          />
          <div
            className={classes.addNewBtn}
            onClick={() => setShowAddNewPayment(true)}
          >
            <Typography styleType="p2" fontType="boldFont">
              <span className={classes.addNewInnerContainer}>
                <AddSolid height={48} width={48} />
                {savedPaymentMethodsData?.addNew?.value}
              </span>
            </Typography>
          </div>
          {showAddNewPayment && (
            <>
              <Typography
                styleType="p1"
                fontType="boldFont"
                className={classes.addPaymentTitle}
              >
                {savedPaymentMethodsData?.addNewPaymentMethod?.value}
              </Typography>
              <AddNewPaymentContainer
                setShowAddNewPayment={setShowAddNewPayment}
                prevDefaultMethodId={prevDefaultMethodId}
                setPrevDefaultMethodId={setPrevDefaultMethodId}
              />
            </>
          )}
        </div>
      )}
    </CardWithTitle>
  )
}

const SavedPaymentMethodsSkeleton = () => {
  const classes = useStyles()
  return (
    <>
      <Skeleton height={30} width={300} className={classes.skeleton} />
      <Skeleton height={30} width={300} className={classes.skeleton} />
      <Skeleton height={30} width={300} className={classes.skeleton} />
      <Skeleton height={30} width={300} className={classes.skeleton} />
    </>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  title: {
    marginBottom: 32,
  },
  editSectionContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  selectedPayment: {
    width: ' 50%',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  editBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      '& svg': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  paymentMethod: {
    marginBottom: 16,
  },
  cardStatus: {
    marginLeft: 8,
    color: colors.main.grayOpacity50,
    fontFamily: PP_OBJECT_SANS_BOLD,
    fontSize: 14,
    lineHeight: 1,
  },
  skeleton: {
    marginBottom: 8,
  },
  addNewBtn: {
    cursor: 'pointer',
  },
  addNewInnerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  noSavedPayments: {
    marginBottom: 32,
  },
  addPaymentTitle: {
    margin: '32px 0px',
    [breakpoints.down('xs')]: {
      marginBottom: 16,
    },
  },
}))
