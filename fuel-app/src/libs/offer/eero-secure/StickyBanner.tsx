import { StickyBanner } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { makeStyles } from '@material-ui/core'

const StickyBannerEero = (): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {
    title,
    buttonText,
    buttonURL,
    chatButtonText,
    chatButtonURL,
    mobileTitle,
  }: any = useAppData('stickyBanner', true) || {}
  const classes = useStyles()
  return (
    <StickyBanner
      buttonText={buttonText?.value}
      buttonURL={buttonURL?.value}
      chatButtonText={chatButtonText?.value}
      chatButtonURL={chatButtonURL?.value}
      mobileTitle={mobileTitle?.value}
      title={title?.value}
      rootStylesClassName={classes.wrapper}
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    margin: '0px auto 40px auto',
    [breakpoints.down('md')]: {
      margin: '0px auto 10px auto',
    },
  },
}))

export default StickyBannerEero
