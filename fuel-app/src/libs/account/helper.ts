import { CREDIT_APPLIED } from 'src/constants/billing'
import { pick } from 'src/utils/appData/dataExtractor'
import { SESSION_STORAGE } from 'src/constants/'
import APIClient from 'src/api-client'
import {
  AutoPayScheduled,
  MakePayment,
  SetUpAutoPay,
  PaymentDue,
  PaymentScheduled,
  ZeroBalance,
  Credit,
  PartialPastDueWithAppliedCredit,
  PastDueWithNoAppliedCredit,
  PayPastDue,
  PastDue,
} from 'src/constants/billing'
import { AppRoutes } from 'src/constants/appRoutes'
// import { BalanceCalendarCheckIcon } from 'src/blitz/assets/react-icons'
import moment from 'moment'
export const isAutoPayEnabled = (autopayType: any) =>
  !(autopayType === false || autopayType === 'false')
export const extractBill = (activeAccountDetails: any) => {
  const { autopayType } = activeAccountDetails
  const isAutopayEnabled = isAutoPayEnabled(autopayType)
  const {
    isPastDue,
    pastDueBalance: { date: pastPayDueDate, amount: pastDueBalanceAmount },
    pendingPayment: { date: pendingPaymentDate },
    currentBalance: {
      dueDate: currentPayDueDate,
      // amount: currentBalanceAmount,
    },
    creditsOrAdjustments: {
      amount: creditsOrAdjustmentsAmount,
      status: creditsOrAdjustmentsStatus,
    },
    scheduledPayments: { amount: scheduledPaymentAmount },
  } = activeAccountDetails.bill ?? {
    pastDueBalance: {},
    pendingPayment: {},
    currentBalance: {},
    scheduledPayments: {},
    creditsOrAdjustments: {},
  }
  const currentBalanceAmount =
    activeAccountDetails?.bill?.currentBalance?.amount ?? 0
  const displayedCurrentBalance =
    currentBalanceAmount === 0
      ? '0.00'
      : Number(currentBalanceAmount).toFixed(2)
  return {
    isPastDue,
    pastPayDueDate,
    pastDueBalanceAmount,
    pendingPaymentDate,
    currentPayDueDate,
    scheduledPaymentAmount,
    creditsOrAdjustmentsAmount,
    creditsOrAdjustmentsStatus,
    isAutopayEnabled,
    currentBalanceAmount,
    displayedCurrentBalance,
  }
}
export const BALANCE_TYPES = {
  AUTO_PAY_PAST_DUE: 'auto-pay-past-due',
  AUTO_PAY_NO_DUE: 'auto-pay-no-due',
  AUTO_PAY_CREDIT: 'auto-pay-credit-available',
  AUTO_PAY_CURRENT_DUE: 'auto-pay-current-due',
  //schedule pay
  SCHEDULE_PAY_PAST_DUE: 'schedule-pay-past-due',
  SCHEDULE_PAY_CURRENT_DUE: 'schedule-pay-current-due',
  SCHEDULE_PAY_NO_DUE_CREDIT: 'schedule-pay-credit-applied',
  SCHEDULE_PAY_PARTIAL_PAST_DUE: 'schedule-pay-partial-past-due',
  SCHEDULE_PAY_PARTIAL_PAST_DUE_CREDIT:
    'schedule-pay-partial-past-due-credit-applied',
  SCHEDULE_PAY_CURRENT_DUE_NO_AUTOPAY: 'scheduled-pay-current-due-no-autopay',
  SCHEDULE_PAY_CURRENT_DUE_AUTOPAY: 'scheduled-pay-current-due-autopay',
  ZERO_BALANCE: 'zero-balance',
  NO_DUE: 'no-due',
  CURRENT_DUE: 'current-due',

  // account suspended
  // ACCOUNT_SUSPENDED_WITH_PAST_DUE: 'account-suspended-with-past-due',
  // ACCOUNT_SUSPENDED_WITH_NO_DUE: 'account-suspended-with-no-due',
  // ACCOUNT_SUSPENDED_WITH_PAST_DUE: 'account-suspended-with-past-due',
}
export const getBalanceType = (billInfo: any) => {
  const {
    isPastDue,
    isAutopayEnabled,
    currentBalanceAmount,
    creditsOrAdjustmentsStatus,
    pastDueBalanceAmount,
    scheduledPaymentAmount,
  } = billInfo
  if (isAutopayEnabled) {
    if (scheduledPaymentAmount > 0)
      return {
        type: BALANCE_TYPES.SCHEDULE_PAY_CURRENT_DUE_AUTOPAY,
        currentBalanceAmount,
      }
    if (isPastDue)
      return {
        type: BALANCE_TYPES.AUTO_PAY_PAST_DUE,
        currentBalanceAmount,
      }
    else if (currentBalanceAmount > 0) {
      return {
        type: BALANCE_TYPES.AUTO_PAY_CURRENT_DUE,
        currentBalanceAmount,
      }
    } else if (currentBalanceAmount === 0) {
      return {
        type: BALANCE_TYPES.AUTO_PAY_NO_DUE,
        currentBalanceAmount,
      }
    } else
      return {
        type:
          creditsOrAdjustmentsStatus === CREDIT_APPLIED &&
          currentBalanceAmount < 0
            ? BALANCE_TYPES.AUTO_PAY_CREDIT
            : BALANCE_TYPES.AUTO_PAY_NO_DUE,
        currentBalanceAmount,
      }
  } else {
    if (isPastDue) {
      if (pastDueBalanceAmount > 0 && currentBalanceAmount > 0)
        return {
          type:
            creditsOrAdjustmentsStatus === CREDIT_APPLIED
              ? BALANCE_TYPES.SCHEDULE_PAY_PARTIAL_PAST_DUE_CREDIT
              : BALANCE_TYPES.SCHEDULE_PAY_PARTIAL_PAST_DUE,
          currentBalanceAmount,
        }
      else
        return {
          type: BALANCE_TYPES.SCHEDULE_PAY_PAST_DUE, //chng to account disconnect
          pastDueBalanceAmount,
        }
    } else {
      if (currentBalanceAmount === 0) {
        return {
          type: BALANCE_TYPES.ZERO_BALANCE,
          currentBalanceAmount,
        }
      } else if (currentBalanceAmount > 0) {
        return {
          type: BALANCE_TYPES.NO_DUE,
          currentBalanceAmount,
        }
      } else {
        return {
          type:
            creditsOrAdjustmentsStatus === CREDIT_APPLIED &&
            currentBalanceAmount < 0
              ? BALANCE_TYPES.SCHEDULE_PAY_NO_DUE_CREDIT
              : BALANCE_TYPES.NO_DUE,
          currentBalanceAmount,
        }
      }
    }
  }
}

export const getFormattedDate = function (date: string) {
  const dateTime = moment(date)
  return dateTime?.format('MMM DD, YYYY') || date
}

export const getLabelAndIcon = (billInfo: any, billingConstants: any) => {
  const { type } = getBalanceType(billInfo)
  const {
    pastDueBalanceAmount,
    currentPayDueDate,
    creditsOrAdjustmentsAmount,
    currentBalanceAmount,
    scheduledPaymentAmount,
  } = billInfo
  switch (type) {
    case BALANCE_TYPES.AUTO_PAY_PAST_DUE:
      return [
        pick(PaymentDue, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(AutoPayScheduled, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'), //currently autopay and current pay due are same, TODO: needs to be changed when updated
        }),
      ]
    case BALANCE_TYPES.AUTO_PAY_NO_DUE:
      return [
        pick(ZeroBalance, billingConstants),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(AutoPayScheduled, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
      ]
    case BALANCE_TYPES.AUTO_PAY_CURRENT_DUE:
      return [
        pick(PaymentDue, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(AutoPayScheduled, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
      ]
    case BALANCE_TYPES.AUTO_PAY_CREDIT:
      return [
        pick(Credit, billingConstants),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(AutoPayScheduled, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
      ]
    case BALANCE_TYPES.SCHEDULE_PAY_PAST_DUE:
      return [
        pick(PaymentScheduled, billingConstants, {
          amount: scheduledPaymentAmount.toString(),
        }),
        // BalanceCalendarCheckIcon,
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(SetUpAutoPay, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
      ]
    case BALANCE_TYPES.SCHEDULE_PAY_CURRENT_DUE_AUTOPAY:
      return [
        pick(PaymentScheduled, billingConstants, {
          amount: scheduledPaymentAmount.toString(),
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(AutoPayScheduled, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
      ]
    case BALANCE_TYPES.SCHEDULE_PAY_CURRENT_DUE_NO_AUTOPAY:
      return [
        pick(PaymentScheduled, billingConstants, {
          amount: scheduledPaymentAmount.toString(),
        }),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(SetUpAutoPay, billingConstants),
      ]
    case BALANCE_TYPES.NO_DUE:
      return [
        pick(PaymentDue, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(SetUpAutoPay, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
      ]
    case BALANCE_TYPES.CURRENT_DUE:
      return [
        pick(PaymentDue, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(SetUpAutoPay, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
      ]
    case BALANCE_TYPES.ZERO_BALANCE:
      return [
        pick(ZeroBalance, billingConstants),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(SetUpAutoPay, billingConstants),
      ]
    case BALANCE_TYPES.SCHEDULE_PAY_NO_DUE_CREDIT:
      return [
        pick(Credit, billingConstants),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(SetUpAutoPay, billingConstants, {
          date: moment(currentPayDueDate).format('MMM DD'),
        }),
      ]
    case BALANCE_TYPES.SCHEDULE_PAY_PARTIAL_PAST_DUE:
      return [
        pick(PastDueWithNoAppliedCredit, billingConstants, {
          dueAmount: pastDueBalanceAmount.toString(),
          billAmount: currentBalanceAmount.toString(),
        }),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(PayPastDue, billingConstants),
      ]
    case BALANCE_TYPES.SCHEDULE_PAY_PARTIAL_PAST_DUE_CREDIT:
      return [
        pick(PartialPastDueWithAppliedCredit, billingConstants, {
          dueAmount: pastDueBalanceAmount.toString(),
          billAmount: currentBalanceAmount.toString(),
          credit: creditsOrAdjustmentsAmount.toString(),
        }),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(PayPastDue, billingConstants),
      ]
    case BALANCE_TYPES.SCHEDULE_PAY_PAST_DUE:
      return [
        pick(PastDue, billingConstants),
        pick(MakePayment, billingConstants),
        AppRoutes.MakeAPaymentPage,
        pick(PayPastDue, billingConstants),
      ]
  }
}

export const getICase = async (accountBtn: string) => {
  const response: any = await APIClient.generateICaseId({
    btn: accountBtn,
  })
  sessionStorage.setItem(SESSION_STORAGE.ICID, response?.data?.iCaseID)
  return response?.data?.iCaseID
}
