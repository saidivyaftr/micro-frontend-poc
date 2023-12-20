import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const NominateYourAreaSuccess = () => {
  const {
    nominateSuccessHeader,
    nominateThanksCopperAvailableSubHeader,
    nominateThanksCopperAvailableSuccessButton,
  } = useAppData('availability', true)
  const { selectedAddress } = useSelector((state: any) => state?.bga)
  const addrKey = selectedAddress?.addressKey
  const { environment, controlNumber } = selectedAddress?.samRecords?.[0] || {}
  const classes = useStyles()
  const node = useRef<HTMLDivElement>(null)
  const DOTCOM_URL = process.env.DOTCOM_URL || ''

  useEffect(() => {
    const nodeOffset = node?.current?.offsetTop || 380
    window.scrollTo({
      top: nodeOffset - 380,
      behavior: 'smooth',
    })
  }, [node])
  return (
    <div className={classes.container}>
      {nominateSuccessHeader?.value && (
        <InjectHTML
          tagType="h2"
          styleType="h4"
          color="secondary"
          className={classes.header}
          value={nominateSuccessHeader?.value}
        />
      )}
      {nominateThanksCopperAvailableSubHeader?.value && (
        <InjectHTML
          tagType="h5"
          styleType="p1"
          color="tertiary"
          className={classes.subheader}
          value={nominateThanksCopperAvailableSubHeader?.value}
        />
      )}
      {nominateThanksCopperAvailableSuccessButton?.text && (
        <Button
          type="link"
          className={classes.btn}
          text={nominateThanksCopperAvailableSuccessButton?.text}
          href={`${DOTCOM_URL}${nominateThanksCopperAvailableSuccessButton?.link.slice(
            1,
          )}/?a=${addrKey}&c=${controlNumber}&e=${environment}`}
          hoverVariant="secondary"
        />
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
  header: {
    margin: 'auto',
    marginBottom: 32,
    fontSize: '42px',
    lineHeight: '50px',
    [breakpoints.down('xs')]: {
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  subheader: {
    margin: 'auto',
    lineHeight: '32px',
    fontSize: '24px',
    [breakpoints.down('xs')]: {
      fontSize: '18px',
      lineHeight: '26px',
    },
  },
  btn: {
    marginTop: 16,
    marginBottom: 24,
    width: 'max-content',
  },
}))

export default NominateYourAreaSuccess
