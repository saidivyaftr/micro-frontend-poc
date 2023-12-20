import { makeStyles } from '@material-ui/core'
import { Button, Typography } from 'src/blitz'
import { AutoPay as AutoPayIcon } from '@/shared-ui/react-icons'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import { useState } from 'react'
import { SetupAutoPay } from './SetupAutoPayForm'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'
import useAppData from '@/shared-ui/hooks/useAppData'

export const AutoPayNotEnrolled = () => {
  const classes = useStyles()
  const autoPayData = useAppData('autoPayData', true)

  const [showSetupForm, setShowSetupForm] = useState(false)

  const handleSetupAutoPayClick = () => {
    setShowSetupForm(true)
    DTMClient.triggerEvent(
      { events: 'event180' },
      'tl_o',
      'my account:begin autopay',
    )
  }

  return (
    <CardWithTitle
      title={autoPayData?.title.value}
      styleType="h5"
      classNameTitle={classes.title}
    >
      <div className={classes.wrapper}>
        {showSetupForm ? (
          <SetupAutoPay setShowSetupForm={setShowSetupForm} />
        ) : (
          <>
            <div className={classes.container}>
              <AutoPayIcon />
              <div className={classes.textContainer}>
                <Typography styleType="p2" fontType="boldFont">
                  {autoPayData?.perkTitle.value}
                </Typography>
                <Typography styleType="p2" fontType="regularFont">
                  {autoPayData?.subTitle.value}
                </Typography>
              </div>
            </div>
            <div className={classes.autoPayButton}>
              <Button
                variant="primary"
                type="button"
                text={autoPayData?.buttonText.value}
                onClick={handleSetupAutoPayClick}
              />
            </div>
          </>
        )}
      </div>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  textContainer: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    gap: 4,
  },
  container: {
    display: 'flex',
    gap: '1rem',
  },
  autoPayButton: {
    [breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  title: {
    marginBottom: 32,
  },
}))
