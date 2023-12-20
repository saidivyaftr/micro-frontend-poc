import { TrophyCase as TrophyCaseComponent } from '@/shared-ui/components'
import { formatTrophyCaseData } from 'src/utils/formatData'
const TrophyCaseInfo = ({ data }: any) => {
  if (Object.keys(data || {})?.length === 0) {
    return null
  }
  const formattedData = formatTrophyCaseData(data)
  return <TrophyCaseComponent {...formattedData} />
}
export default TrophyCaseInfo
