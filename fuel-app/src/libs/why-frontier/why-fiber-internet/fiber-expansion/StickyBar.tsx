import { Typography, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { WifiIcon } from 'src/blitz/assets/react-icons'
import { useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import clx from 'classnames'

const StickyBar = ({ isSectionFixed }: any) => {
  const {
    FiberInternetAvailableAtYourAddress,
    signMeUpText,
    signMeUpURL,
    alreadyCustomer,
    chatWithUs,
  } = useAppData('stickybar', true)
  const classes = useStyles()
  const DOTCOM_URL = process.env.DOTCOM_URL || ''
  const { selectedAddress } = useSelector((state: State) => state?.bga)
  const addrKey = selectedAddress?.addressKey
  const { environment, controlNumber } = selectedAddress?.samRecords?.[0] || {}

  const handleClick = () => {
    try {
      const chat = document.getElementsByClassName(
        'minimized',
      ) as HTMLCollectionOf<HTMLElement>
      chat[0]?.click()
    } catch (e) {}
  }
  return (
    <div className={classes.container}>
      <div
        className={clx(classes.largeComponent, {
          [classes.hideLargeComponent]: !isSectionFixed,
        })}
      >
        {signMeUpText?.value && (
          <div className={classes.content}>
            <div className={classes.innerContentHidden}>
              <WifiIcon />
              {FiberInternetAvailableAtYourAddress?.value && (
                <Typography
                  tagType="p"
                  styleType="p3"
                  fontType="boldFont"
                  color="tertiary"
                  className={classes.fiberText}
                >
                  {FiberInternetAvailableAtYourAddress?.value}
                </Typography>
              )}
            </div>
            {}
            <Button
              type="link"
              hoverVariant="secondary"
              className={classes.btn}
              text={signMeUpText?.value}
              href={`${DOTCOM_URL}${signMeUpURL?.link.slice(
                1,
              )}/?a=${addrKey}&c=${controlNumber}&e=${environment}`}
            />
            <div className={classes.innerContent}>
              {alreadyCustomer?.value && (
                <Typography
                  tagType="p"
                  styleType="p3"
                  fontType="regularFont"
                  color="tertiary"
                  className={classes.customerText}
                >
                  {alreadyCustomer?.value}
                </Typography>
              )}

              <button onClick={handleClick} className={classes.chatBtn}>
                {chatWithUs?.value && (
                  <Typography color="tertiary" className={classes.chatText}>
                    {chatWithUs?.value}
                  </Typography>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px 16px',
    flexWrap: 'wrap',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      padding: '40px 16px',
    },
  },
  innerContentHidden: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  innerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fiberText: {
    fontSize: '18px',
    marginLeft: '0.6rem',
  },
  btn: {
    width: 'max-content',
    margin: '0rem 1rem',
    [breakpoints.down('xs')]: {
      width: '100%',
      margin: '0rem',
    },
  },

  chatBtn: {
    background: 'transparent',
    border: 0,
    cursor: 'pointer',
    fontSize: '18px',
    lineHeight: '26px',
    [breakpoints.down('xs')]: {
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  customerText: {
    fontSize: '16px',
    lineHeight: '26px',
    fontFamily: PP_OBJECT_SANS,
    [breakpoints.down('xs')]: {
      fontSize: '14px',
      lineHeight: '24px',
    },
  },
  chatText: {
    fontSize: '18px',
    lineHeight: '26px',
    textDecoration: 'underline',
    fontFamily: PP_OBJECT_SANS,
    '&:hover': {
      color: colors.main.brightRed,
    },
    [breakpoints.down('xs')]: {
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  largeComponent: {
    transition: '.6s all',
  },
  hideLargeComponent: {
    opacity: 0,
    height: 0,
    transition: '.0s all',
  },
}))

export default StickyBar
