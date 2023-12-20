import { makeStyles } from '@material-ui/core'
import { Button, Skeleton, Typography } from 'src/blitz'
import { CardWithTitle } from 'src/blitz/components/Card/Card'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import { payYourBillCard as payYourBillCardMock } from './sitecore-mock'
import { useAccountList, useActiveAccount } from 'src/selector-hooks'
import moment from 'moment'
import { useRouter } from 'next/router'
import { AppRoutes } from 'src/constants'
import ErrorMessage from 'src/libs/account/shared/ErrorMessage'
import { formatAmountInDollar } from 'src/utils/amount'
import useAppData from '@/shared-ui/hooks/useAppData'

export const PayYourBillCard = () => {
  const classes = useStyles()
  const router = useRouter()
  const payYourBillCardData = useAppData('payYourBillCard', true)
  const payYourBillCard =
    Object.keys(payYourBillCardData)?.length > 0
      ? payYourBillCardData
      : payYourBillCardMock

  const { isLoading: isActiveListLoading } = useAccountList()
  const { isLoading, data } = useActiveAccount()

  const noEnoughData = !Boolean(data?.bill?.currentBalance)
  const billAmount = data?.bill?.currentBalance?.amount
  const dueDate = data?.bill?.currentBalance?.dueDate
  const formattedDueDate = dueDate ? moment(dueDate).format('MMMM DD') : null

  const handleMakePayment = () => {
    const MAKE_PAYMENT_CLICK = 'my account:make a payment click'
    DTMClient.triggerEvent(
      {
        events: 'event14',
        eVar14: MAKE_PAYMENT_CLICK,
      },
      'tl_o',
      MAKE_PAYMENT_CLICK,
    )
    router.push({ pathname: AppRoutes.MakeAPaymentPage, query: router.query })
  }

  return (
    <CardWithTitle
      title={payYourBillCard?.title?.value}
      size="big-rectangle"
      styleType="h5"
      tagType="h5"
    >
      <div className={classes.innerWrapper}>
        {isLoading || isActiveListLoading ? (
          <>
            <Skeleton height={30} width={200} />
            <Skeleton height={30} width={150} />
          </>
        ) : (
          <div>
            {noEnoughData ? (
              <ErrorMessage
                message={payYourBillCard?.somethingWentWrong?.value}
              />
            ) : (
              <>
                <Typography styleType="p2" fontType="boldFont">
                  <>{`${
                    payYourBillCard?.totalBalance?.value
                  } ${formatAmountInDollar(billAmount)}`}</>
                </Typography>
                <Typography styleType="p2" className={classes.paymentDue}>
                  <>{`${payYourBillCard?.paymentDue?.value} ${formattedDueDate}`}</>
                </Typography>
                <Button
                  type="button"
                  variant="secondary"
                  text={payYourBillCard?.makeAPaymentBtn?.value}
                  onClick={handleMakePayment}
                />
              </>
            )}
          </div>
        )}
      </div>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({}) => ({
  loadingCtr: {
    padding: '2rem 0',
  },
  innerWrapper: {
    marginTop: 16,
  },
  paymentDue: {
    marginTop: 4,
    marginBottom: 32,
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'top',
    gap: 4,
  },
}))
