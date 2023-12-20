import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import colors from '@/shared-ui/colors'
import { InjectHTML, Typography } from '@/shared-ui/components'
import ChatNow from './components/ChatNow'
import CallUs from './components/CallUs'
import MultilingualSupport from './components/MultilingualSupport'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER, SITE_INTERACTION } from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const GetInTouch = () => {
  const classes = useStyles()
  const getInTouchData = useAppData('getInTouch', true)
  const chatNowData = useAppData('chatNow', true)
  const callUsData = useAppData('callUs', true)
  const multilingualSupportData = useAppData('multilingualSupport', true)
  const { mainTitle, firstTitle, secondTitle, thirdTitle } = getInTouchData
  const [activeTab, setActiveTab] = useState(firstTitle?.value)

  if (
    Object.keys(getInTouchData)?.length === 0 ||
    Object.keys(chatNowData)?.length === 0 ||
    Object.keys(callUsData)?.length === 0
  ) {
    return null
  }

  const trackTabActivity = (titleValue: string) => {
    if (titleValue) {
      DTMClient.triggerEvent(
        {
          events: 'event14',
          eVar14: titleValue,
        },
        'tl_o',
        SITE_INTERACTION,
      )
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <InjectHTML
          addAnchorStyles
          tagType="h2"
          styleType="h4"
          value={mainTitle?.value}
        />
        <div className={classes.subtitles}>
          <div
            className={clx(classes.subtitleContainer, {
              [classes.subtitleContainerActive]:
                activeTab === firstTitle?.value,
            })}
            role="button"
            onClick={() => {
              setActiveTab(firstTitle?.value)
              trackTabActivity('Tab:' + firstTitle?.value)
            }}
          >
            <Typography
              color={activeTab === firstTitle?.value ? 'primary' : undefined}
              tagType="h3"
              styleType="h6"
            >
              {firstTitle?.value}
            </Typography>
          </div>
          <div
            className={clx(classes.subtitleContainer, {
              [classes.subtitleContainerActive]:
                activeTab === secondTitle?.value,
            })}
            role="button"
            onClick={() => {
              setActiveTab(secondTitle?.value)
              trackTabActivity('Tab:' + secondTitle?.value)
            }}
          >
            <Typography
              color={activeTab === secondTitle?.value ? 'primary' : undefined}
              tagType="h3"
              styleType="h6"
            >
              {secondTitle?.value}
            </Typography>
          </div>
          <div
            className={clx(classes.subtitleContainer, {
              [classes.subtitleContainerActive]:
                activeTab === thirdTitle?.value,
            })}
            role="button"
            onClick={() => {
              setActiveTab(thirdTitle?.value)
              trackTabActivity('Tab:' + thirdTitle?.value)
            }}
          >
            <Typography
              color={activeTab === thirdTitle?.value ? 'primary' : undefined}
              tagType="h3"
              styleType="h6"
            >
              {thirdTitle?.value}
            </Typography>
          </div>
        </div>
        {activeTab === firstTitle?.value && <ChatNow data={chatNowData} />}
        {activeTab === secondTitle?.value && <CallUs data={callUsData} />}
        {activeTab === thirdTitle?.value && (
          <MultilingualSupport data={multilingualSupportData} />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    padding: '4px 0',
  },
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
  },
  subtitles: {
    fontSize: '1.125rem',
    display: 'flex',
    width: '100%',
    marginTop: '2rem',
    justifyContent: 'space-around',
    [breakpoints.down('xs')]: {
      alignItems: 'flex-end',
    },
  },
  subtitleContainer: {
    paddingBottom: '1rem',
    borderBottom: `4px solid ${colors.main.borderGrey}`,
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
    '& h3': {
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  subtitleContainerActive: {
    borderBottom: `4px solid ${colors.main.brightRed}`,
  },
}))

export default GetInTouch
