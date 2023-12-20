import { fetchAppData, fetchAppDataFromAzure } from './fetcher'

const getStaticProps = (path = '/', returnDirty = false) => {
  return async ({ locale }: any) => {
    const preferredLocale = locale === 'es' ? 'es-ES' : 'en'
    const data = await fetchAppData(path, returnDirty, preferredLocale)
    console.log('data fetched, data fetcher')
    const success = Object.keys(data)?.length > 0
    return {
      props: {
        success,
        data,
      },
      revalidate: 60,
    }
  }
}

export const customStaticPropsfromAzure = (path = '/', returnDirty = false) => {
  return async (ctx: any) => {
    const data = await fetchAppDataFromAzure(path, returnDirty)
    const success = Object.keys(data)?.length > 0
    if (success) {
      return {
        props: {
          success,
          data,
        },
        revalidate: 60,
      }
    } else {
      return (
        ctx?.previous ?? {
          props: {
            success,
            data,
          },
          revalidate: 60,
        }
      )
    }
  }
}

export default getStaticProps
