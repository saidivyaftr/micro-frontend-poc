import { AuthenticationOption } from 'src/redux/types/accountAccessTypes'

export const getAccessCodeDropdownList = (options: AuthenticationOption[]) => {
  const optionsWithCode = options?.filter(
    (x) => x.type === 'sms' || x.type === 'voice' || x.type === 'email',
  )
  return optionsWithCode.map((x) => ({
    label: getAccessCodeDropdownLabel(x),
    value: x.id,
  }))
}

const getAccessCodeDropdownLabel = (option: AuthenticationOption) => {
  switch (option.type) {
    case 'sms':
      return `Sms ${option.telephoneNumber}`
    case 'voice':
      return `Call ${option.telephoneNumber}`
    case 'email':
      return `Email ${option.telephoneNumber}`
  }
}
