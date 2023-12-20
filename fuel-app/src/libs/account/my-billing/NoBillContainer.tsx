import FrontierApp from 'src/libs/account/shared/FrontierAppContainer'
import NoBillContainer from 'src/libs/account/shared/NoBillContainer'
import { useAppData } from 'src/hooks'
const NoBill = () => {
  const noDueBill = useAppData('noDueBill', true)
  return (
    <>
      <NoBillContainer
        description={noDueBill?.description?.value}
        title={noDueBill?.title?.value}
        image={noDueBill?.image}
      />
      <FrontierApp />
    </>
  )
}

export default NoBill
