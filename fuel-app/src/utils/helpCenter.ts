export const getBreadcrumbRoutes = (url = '') => {
  if (!url) {
    return []
  }
  const urlSplits = url.split('/').filter((x) => x)
  const routes = []
  for (let i = 0; i < urlSplits.length; i++) {
    if (skipRoutes[urlSplits[i]?.toLowerCase?.()]) {
      continue
    }
    routes.push({
      pageName:
        urlSplits[i] === 'helpcenter'
          ? 'Support'
          : formatPageName(urlSplits[i]),
      href: '/' + urlSplits.slice(0, i + 1).join('/'),
      isCurrent: urlSplits.length === i + 1,
    })
  }
  return routes
}

const skipRoutes: any = {
  troubleshooting: true,
}

const formatPageName = (pageName = '') => {
  if (!pageName) {
    return ''
  }
  return pageName.replace(/-/g, ' ')
}

export const decodeHtmlCharCodes = (str = '') => {
  try {
    const tmp = document.createElement('div')
    tmp.innerHTML = str
    return tmp.textContent || tmp.innerText
  } catch (error) {
    return str
  }
}
