export const formatUrl = (url: string) => {
  return process.env.NODE_ENV === 'development' && !url.includes('{baseUrl}')
    ? '/pages' + url
    : url
}
