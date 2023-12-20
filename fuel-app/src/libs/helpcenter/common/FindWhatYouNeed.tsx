import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { Typography, Button } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData, useChatState } from 'src/hooks'

const FindWhatYouNeed = ({ data }: { data?: any }) => {
  let findWhatYouNeedData = useAppData('ChatWithUs', true)
  const { setChatState } = useChatState()
  findWhatYouNeedData = data || findWhatYouNeedData
  const { text, chatButtonText, backgroundColor } = findWhatYouNeedData
  const classes = useStyles()

  return (
    <div
      className={classes.wrapper}
      style={{
        backgroundColor:
          backgroundColor?.targetItem?.backgroundColorHexCode?.value,
      }}
    >
      <div className={classes.root}>
        <Typography styleType="h5" tagType="h2" className={classes.title}>
          {text?.value}
        </Typography>
        <Button
          type="button"
          variant="tertiary"
          onClick={() => setChatState(true)}
          text={chatButtonText?.value}
          className={classes.btn}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    backgroundColor: colors.main.greenishBlue,
    padding: `25px 1rem`,
  },
  root: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: 0,
      padding: 0,
    },
  },
  title: {
    [breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
  btn: {
    width: 'max-content',
    fontSize: 18,
    [breakpoints.down('xs')]: {
      marginTop: 24,
      width: '100%',
    },
  },
}))

export default FindWhatYouNeed
