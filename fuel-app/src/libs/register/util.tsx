import { AuthorizationMethods } from 'src/redux/types/registerTypes'

export const getMethod = (
  authorizationMethods: AuthorizationMethods[],
  methodType: string,
) => {
  const filteredMethod = authorizationMethods?.find(
    ({ method }) => method === methodType,
  )

  return filteredMethod
}
