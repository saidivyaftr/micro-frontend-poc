import { useSelector } from 'react-redux'

const useAppData = (id: string, pullDataSource = false, item = null) => {
  if (item) return item
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useSelector((state: any) => state?.appData?.data?.[id])
  if (pullDataSource) {
    return data?.fields?.data?.datasource || {}
  }
  return data || {}
}

export default useAppData
