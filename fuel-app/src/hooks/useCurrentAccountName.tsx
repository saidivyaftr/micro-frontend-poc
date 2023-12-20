import { useAccountList, useActiveAccount } from 'src/selector-hooks'

const useCurrentAccountName = () => {
  const { data: accounts } = useAccountList()
  const { data: activeAccountData } = useActiveAccount()
  const { accountNumber, firstName, lastName } = activeAccountData

  const hasData =
    accounts.length > 0 && Object.keys(activeAccountData).length > 0

  if (!hasData) {
    return {
      fullName: null,
      firstName: null,
      lastName: null,
    }
  }

  const currentAccount = accounts?.find(
    (account) => account.accountNumber === accountNumber,
  )
  const fullName = [firstName, lastName].filter(Boolean).join(' ')
  return {
    fullName: fullName ?? currentAccount?.name,
    firstName: firstName ?? currentAccount?.firstName,
    lastName: lastName ?? currentAccount?.lastName,
  }
}

export default useCurrentAccountName
