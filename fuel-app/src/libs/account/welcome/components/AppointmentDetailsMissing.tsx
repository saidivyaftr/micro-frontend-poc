import { makeStyles } from '@material-ui/core'
import { Button, Typography } from 'src/blitz'
import useChatState from '@/shared-ui/hooks/useChatState'
import useAppData from '@/shared-ui/hooks/useAppData'
import {
  SITE_INTERACTION,
  WELCOME_ORDER_DETAILS_CHAT_WITH_US,
  WELCOME_PAGE_LAUNCH_OPTION,
} from 'src/constants'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const AppointmentDetailsMissing = () => {
  const classes = useStyles()
  const { setChatState, setChatParams } = useChatState()
  const { noAppointmentDetail, chatWithUs } =
    useAppData('OrderDetails', true) || {}

  const handleChatClick = () => {
    setChatParams({
      launchOption: WELCOME_PAGE_LAUNCH_OPTION,
    })
    DTMClient.triggerEvent(
      {
        events: 'event5,event14',
        eVar14: WELCOME_ORDER_DETAILS_CHAT_WITH_US,
      },
      'tl_o',
      SITE_INTERACTION,
    )
    setChatState(true)
  }

  return (
    <Typography styleType="p1" testId="test-noAppointmentDetail">
      <>
        {`${noAppointmentDetail?.value} `}
        <Button
          buttonSize="small"
          className={classes.chatWithUs}
          type="link"
          onClick={handleChatClick}
          target="_blank"
          variant="lite"
          text={chatWithUs?.value}
        />
      </>
    </Typography>
  )
}

const useStyles = makeStyles(() => ({
  chatWithUs: {
    textDecoration: 'underline',
    fontSize: '1.125rem',
  },
}))

export default AppointmentDetailsMissing
