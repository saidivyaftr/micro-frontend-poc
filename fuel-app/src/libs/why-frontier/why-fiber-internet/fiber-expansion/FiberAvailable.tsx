import { InjectHTML, Typography, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'src/redux/types'
import { formSingleLineAddress } from 'src/utils/addressHelpers'
import { bgaSlice } from 'src/redux/slicers'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { useEffect, useRef } from 'react'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'

const FiberAvailable = () => {
  const {
    header,
    subheader,
    editAddress,
    signMeUpText,
    signMeUpURL,
    alreadyCustomer,
    chatWithUs,
  } = useAppData('fiberAvailable', true)
  const classes = useStyles()
  const { selectedAddress } = useSelector((state: State) => state?.bga)
  const singleLineAddress =
    selectedAddress?.address != null
      ? formSingleLineAddress(selectedAddress?.address, true)
      : ''
  const addrKey = selectedAddress?.addressKey
  const { environment, controlNumber } = selectedAddress?.samRecords?.[0] || {}
  const dispatch = useDispatch()
  const DOTCOM_URL = process.env.DOTCOM_URL || ''

  const node = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const nodeOffset = node?.current?.offsetTop || 320
    window.scrollTo({
      top: nodeOffset - 420,
      behavior: 'smooth',
    })
  }, [node])

  const handleEdit = () => {
    dispatch(bgaSlice.actions.setStep('check_availability'))
    dispatch(bgaSlice.actions.setSelectedAddress(undefined))
    dispatch(bgaSlice.actions.setStatus(''))
  }

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
      {header?.value && (
        <InjectHTML
          tagType="h2"
          styleType="h4"
          color="secondary"
          className={classes.title}
          value={header?.value}
        />
      )}

      {subheader?.value && (
        <InjectHTML
          tagType="h5"
          styleType="h5"
          color="tertiary"
          className={classes.description}
          value={subheader?.value}
        />
      )}

      <div className={classes.addressWrapper}>
        <Typography
          color="tertiary"
          tagType="p"
          styleType="h6"
          fontType="regularFont"
        >
          {singleLineAddress}
        </Typography>
        <button onClick={handleEdit} className={classes.editBtn}>
          {editAddress?.value && (
            <Typography color="tertiary" className={classes.editAddressBtnText}>
              {editAddress?.value}
            </Typography>
          )}
        </button>
      </div>
      {signMeUpText?.value && (
        <Button
          type="link"
          hoverVariant="secondary"
          className={classes.btn}
          text={signMeUpText?.value}
          href={`${DOTCOM_URL}${signMeUpURL?.link.slice(
            1,
          )}/?a=${addrKey}&c=${controlNumber}&e=${environment}`}
        />
      )}
      {alreadyCustomer?.value && (
        <div className={classes.customerContent}>
          <Typography
            tagType="p"
            styleType="p3"
            fontType="regularFont"
            color="tertiary"
            className={classes.customerText}
          >
            {alreadyCustomer?.value}
          </Typography>
          <button onClick={handleClick} className={classes.chatBtn}>
            {chatWithUs?.value && (
              <Typography color="tertiary" className={classes.chatText}>
                {chatWithUs?.value}
              </Typography>
            )}
          </button>
        </div>
      )}
      <div ref={node}>&nbsp;</div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: 32,
    fontSize: 42,
    [breakpoints.down('xs')]: {
      fontSize: 24,
      marginBottom: 16,
    },
  },
  description: {
    maxWidth: 600,
    margin: 'auto',
    fontSize: 30,
    [breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  addressWrapper: {
    margin: 'auto',
    marginTop: 8,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'baseline',
    '& p': {
      fontSize: 30,
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [breakpoints.down('xs')]: {
      marginTop: 0,
      '& p': {
        fontSize: 20,
      },
    },
  },
  editBtn: {
    background: 'transparent',
    border: 0,
    marginLeft: 8,
    cursor: 'pointer',
    [breakpoints.down('xs')]: {
      marginLeft: 0,
      padding: 0,
    },
  },
  editAddressBtnText: {
    fontSize: '15px',
    textDecoration: 'underline',
    '&:hover': {
      color: colors.main.brightRed,
    },
    [breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
  btn: {
    marginTop: 32,
    width: 'max-content',
  },
  customerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
}))

export default FiberAvailable
