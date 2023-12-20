import { useMemo } from 'react'

const useBreadcrumbParser = (breadcrumb: any) => {
  return useMemo(() => {
    if (!breadcrumb) {
      return null
    }
    return (
      breadcrumb?.map?.(({ title, href, pageName }: any, index: number) => ({
        pageName: title?.value ? title?.value : pageName?.value,
        href: href?.value,
        isCurrent: index === breadcrumb?.length - 1,
      })) || null
    )
  }, [breadcrumb])
}

export default useBreadcrumbParser
