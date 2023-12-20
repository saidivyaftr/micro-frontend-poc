import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import { Typography } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import {
  COMPONENT_WRAPPER,
  CUSTOMER,
  RESIDENTIAL_CUSTOMER,
  SERVICEABLE,
  SERVICES_ACTIVE_SERVICES_TAB,
} from 'src/constants'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useMyServicesContext } from '../MyServicesContextProvider'
import { useSelector } from 'react-redux'
import { useSessionState } from 'src/selector-hooks'
import { State } from 'src/redux/types'
import { pageViewAnalytics } from 'src/libs/services/shared/AnalyticsUtlis'

type activeAccountDataType = {
  accountStatusNew?: string
  id?: string
  accountType?: string
  accountUuid?: string
}

const Tabs = (props: any) => {
  const classes = useStyles()
  const { setSelectedTab, selectedTab } = useMyServicesContext()
  const { asPath } = useRouter() || {}
  const [activeAccountData, setActiveAccountData] =
    useState<activeAccountDataType>()

  const { list, activeAccount } =
    useSelector((state: State) => state?.account) || {}

  const { data: sessionState } = useSessionState()

  useEffect(() => {
    if (activeAccount.id !== '') {
      getActiveAccountData()
    }
  }, [activeAccount.id, list])

  const getActiveAccountData = () => {
    const data: activeAccountDataType =
      list.data.find((item: any) => item.id === activeAccount.id) || {}
    setActiveAccountData(data)
  }
  const handleChange = (index: any) => {
    if (index === 1) {
      window.location.href = '#addOns'
    } else {
      window.location.href = '#myService'
    }
    setSelectedTab(index)
  }

  useEffect(() => {
    if (activeAccountData) {
      handlePageViewAnalytics(selectedTab)
    }
  }, [activeAccountData, selectedTab])

  const handlePageViewAnalytics = (tabIndex: number) => {
    // Analytics
    if (activeAccountData && tabIndex == 0) {
      const eventData = {
        pageName: SERVICES_ACTIVE_SERVICES_TAB,
        eVar21: sessionState?.fidUuid, //fidUuid
        eVar22:
          activeAccountData.accountType === 'Residential'
            ? RESIDENTIAL_CUSTOMER
            : CUSTOMER, //userType
        eVar51: activeAccount?.details?.data?.usi,
        eVar60: '',
        eVar66: activeAccountData.accountType, //CustomerType
        eVar100: activeAccountData.accountUuid, // AccountUUID
        eVar49: SERVICEABLE,
      }
      pageViewAnalytics(eventData)
    }
  }

  useEffect(() => {
    if (asPath.indexOf('#addOns') > -1) {
      setSelectedTab(1)
    }
  }, [])

  useEffect(() => {
    if (props.disableAddOns) {
      setSelectedTab(0)
    }
  }, [props.disableAddOns])

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {props.children.map((elem: any, index: any) => {
          const style = index === selectedTab ? classes.selected : ''
          return (
            <>
              {elem.props.disabled && <div className={classes.overlay}></div>}
              <div
                key={index}
                className={clsx(classes.list, style)}
                onClick={() => !elem.props.disabled && handleChange(index)}
              >
                <Typography tagType="p" styleType="p1" color={'tertiary'}>
                  {elem.props.title}
                </Typography>
              </div>
            </>
          )
        })}
      </div>
      <div className={classes.tabContainerWrapper}>
        <div
          className={classNames([
            classes.container,
            classes.tabSelectedContent,
          ])}
        >
          {props.children[selectedTab]}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    width: '100%',
    background: colors.main.dark,
    height: 'auto',
    marginTop: '-1px',
    [breakpoints.up('sm')]: {
      width: '100vw',
    },
  },
  container: {
    position: 'relative',
    ...COMPONENT_WRAPPER,
  },
  list: {
    display: 'inline-block',
    marginLeft: 0,
    padding: 0,
    borderBottom: `3px solid ${colors.main.dark}`,
    transition: 'all 0.5s',
    cursor: 'pointer',
    width: '50%',
    color: colors.main.white,
    textAlign: 'center',
    [breakpoints.up('sm')]: {
      width: '50%',
    },
    [breakpoints.up('md')]: {
      width: 400,
    },
  },
  selected: {
    borderBottom: `3px solid ${colors.main.carmineRed}`,
  },
  tabContainerWrapper: {
    background: colors.main.newBackgroundGray,
  },
  tabSelectedContent: {
    padding: '40px 0',
    [breakpoints.up('lg')]: {
      padding: '80px 0px',
    },
  },
  overlay: {
    position: 'absolute',
    cursor: 'not-allowed',
    height: 58,
    width: '50%',
    left: '50%',
    bottom: 0,
    [breakpoints.up('sm')]: {
      width: '50%',
      left: '50%',
    },
    [breakpoints.up('md')]: {
      width: 400,
      left: 416,
    },
    opacity: 0.5,
    background: colors.main.dark,
  },
}))

export default Tabs
