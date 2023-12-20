export interface AdobeTarget {
  organizationId: string
  client: string
  serverDomain: string
  visitorState: string
  serverState: ServerState
}

export interface ServerState {
  request: Request
  response: Response
}

export interface Request {
  requestId: string
  id: Id
  context: Context
  experienceCloud: ExperienceCloud
  prefetch: Prefetch
}

export interface Id {
  tntId: string
}

export interface Context {
  channel: string
  timeOffsetInMinutes: number
}

export interface ExperienceCloud {
  analytics: Analytics
}

export interface Analytics {
  supplementalDataId: string
  logging: string
}

export interface Prefetch {
  views?: ViewsEntity[] | null
}

export interface ViewsEntity {
  address: Address
}

export interface Address {
  url: string
}

export interface Response {
  status: number
  requestId: string
  id: Id
  client: string
  edgeHost: string
  prefetch: { [key: string]: [value: string] }
}
