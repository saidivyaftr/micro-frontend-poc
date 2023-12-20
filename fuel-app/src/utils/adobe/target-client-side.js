// leaving this file until we have final sign-off from the Adobe Team
function triggerView(viewName) {
  if (
    typeof adobe != 'undefined' &&
    adobe.target &&
    typeof adobe.target.triggerView === 'function'
  ) {
    adobe.target.triggerView(viewName)
  }
}

export default {
  triggerView,
}
