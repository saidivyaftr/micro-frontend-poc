import { useAppData } from 'src/hooks'
import { InjectHTML, Button } from '@/shared-ui/components'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { COMPONENT_WRAPPER } from 'src/constants'
import { Location } from '@/shared-ui/react-icons'
import { IShopComponents } from './types'
const ShopAlert = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const [hideAlert, setHideAlert] = useState(false)
  const handleClose = () => {
    setHideAlert(true)
  }
  const {
    message,
    backgroundColor,
    buttonText,
    buttonVariant,
    buttonHoverVariant,
    buttonLink,
    messageColor,
  } = useAppData('shopBanner', true)
  if (hideAlert || !message) return null
  return (
    <div
      style={{
        backgroundColor: backgroundColor?.targetItem?.Color?.value,
        ...styles,
      }}
    >
      <div className={classes.bannerWrapper}>
        <Location className={classes.locationIcon} />
        <InjectHTML
          testId="test-banner-message"
          tagType="h5"
          styleType="p1"
          fontType="mediumFont"
          className={classes.message}
          value={`${message?.value}`}
          style={{ textColor: messageColor?.targetItem?.Color?.value }}
        />
        {buttonText?.value && (
          <Button
            className={classes.signBtn}
            onClick={handleClose}
            text={buttonText?.value}
            variant={buttonVariant?.targetItem?.type?.value}
            type="link"
            href={buttonLink?.href}
            buttonSize="large"
            hoverVariant={buttonHoverVariant?.targetItem?.type?.value}
          />
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  bannerContainer: {},
  bannerWrapper: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 5rem',
    gap: '1rem',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '3rem 1rem',
    },
  },
  signBtn: {
    border: 'none',
    cursor: 'pointer',
  },
  locationIcon: {},
  message: {
    color: 'inherit',
    margin: 0,
    '& a': {
      textDecoration: 'underline',
    },
  },
}))

export default ShopAlert
