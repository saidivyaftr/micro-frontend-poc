// declared typescript nocheck to get around s_dtm and _satellite
// eslint-disable-next-line
// @ts-nocheck

function triggerEvent(dataObject, trackType?, friendlyName?) {
  if (typeof s_dtm != 'undefined' && typeof s_dtm.trackData === 'function') {
    s_dtm.trackData(dataObject, trackType, friendlyName)
  }
}

function pageLoadEvent() {
  if (
    typeof _satellite != 'undefined' &&
    typeof _satellite.pageBottom === 'function'
  ) {
    _satellite.pageBottom()
  }
}

export default {
  triggerEvent,
  pageLoadEvent,
}
