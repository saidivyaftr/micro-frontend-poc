import { TrophyCase as TrophyCaseComponent } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { formatTrophyCaseData } from 'src/utils/formatData'

const TrophyCase = ({ data }: any) => {
  const componentData = useAppData('trophyCase', true)
  const finalData = data ?? componentData
  if (Object.keys(finalData || {})?.length === 0) {
    return null
  }
  const formattedData = formatTrophyCaseData(finalData)
  return <TrophyCaseComponent {...formattedData} />
}

export default TrophyCase
