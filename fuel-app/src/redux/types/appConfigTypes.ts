export type AppConfig = {
  configs: {
    DTM: boolean
    INVOCA: boolean
    isChatOpen: boolean
    showTerms: boolean
    chatJWT: null
    GTAG: {
      [key: string]: boolean
    }
  }
}
