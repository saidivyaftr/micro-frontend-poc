import { useState, useEffect } from 'react'
import Tabs from './MyServicesTabs'
//import ChatwithUs from '../RightPanel/ChatwithUs'
import AddOns from '../AddOns/AddOns'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import ActiveServices from '../ActiveServices/ActiveServices'

const Panel = (props: any) => {
  return <div>{props.children}</div>
}

type activeAccountDataType = {
  accountStatusNew?: string
}

function MyServicesTabbedPanel() {
  const [activeAccountData, setActiveAccountData] =
    useState<activeAccountDataType>()
  const [isAccountDisconnected, setAccountDisconnected] =
    useState<boolean>(false)
  const [isAccountSuspended, setAccountSuspended] = useState<boolean>(false)

  const { list, activeAccount } =
    useSelector((state: State) => state?.account) || {}

  useEffect(() => {
    if (activeAccount.id !== '') {
      getActiveAccountData()
    }
  }, [activeAccount.id, list])

  const getActiveAccountData = () => {
    const data: activeAccountDataType =
      list.data.find((item: any) => item.id === activeAccount.id) || {}
    const accountSuspended = data?.accountStatusNew === 'suspended'
    const accountDisconnected = data?.accountStatusNew === 'disconnected'
    setAccountSuspended(accountSuspended)
    setAccountDisconnected(accountDisconnected)
    setActiveAccountData(data)
  }

  return (
    <>
      <Tabs disableAddOns={isAccountSuspended || isAccountDisconnected}>
        <Panel title="Active services">
          <ActiveServices
            isAccountDisconnected={isAccountDisconnected}
            isAccountSuspended={isAccountSuspended}
            activeAccountData={activeAccountData}
          />
        </Panel>
        <Panel
          title="Add-ons"
          disableAddOns={isAccountSuspended || isAccountDisconnected}
        >
          <AddOns key={0} />
        </Panel>
      </Tabs>
    </>
  )
}

export default MyServicesTabbedPanel
