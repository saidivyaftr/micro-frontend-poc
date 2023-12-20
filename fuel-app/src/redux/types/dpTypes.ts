export type DpAckState = {
  step: 'confirm' | 'success' | 'error'
  userTosStatuses: ServerTosStatus[]
}

export type TosStatus = {
  type: string
  status: string
}

export type ServerTosStatus = {
  service: string
  status: string
  tosType: string
}
