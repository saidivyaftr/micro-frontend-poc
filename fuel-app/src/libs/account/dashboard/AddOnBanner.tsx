import { makeStyles } from '@material-ui/core'
import { Typography, Button } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import clx from 'classnames'
import useWindowDimensions from '@/shared-ui/hooks/useWindowDimensions'
import { useEffect, useState } from 'react'
import { useAppData } from 'src/hooks'

const AddOnBanner = () => {
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const addOnBanner = useAppData('addOnBanner', true)
  const isMobileOrTablet = width <= 768
  const {
    title,
    description,
    showStripes,
    stripesPosition,
    ctaTitle,
    ctaLink,
    theme,
    openInNewTab,
  } = addOnBanner

  const stripesPositionVal = stripesPosition?.targetItem?.value?.value
    ? stripesPosition?.targetItem?.value?.value
    : 'left'
  const themeValue = theme?.targetItem?.value?.value
  const contentColor = themeValue == 'gravity' ? 'tertiary' : 'default'
  const [mobileView, setMobileView] = useState(false)
  const urlTarget =
    openInNewTab || openInNewTab?.value == true ? '_blank' : '_self'

  useEffect(() => {
    setMobileView(isMobileOrTablet)
  }, [isMobileOrTablet])
  const getLeftStripesContent = () => {
    return (
      <div
        className={clx(classes.contentWrapper, 'contentWrapper', {
          [classes.ShowLeftStripes]: showStripes?.value,
        })}
      >
        {showStripes?.value && (
          <div className={clx(classes.stripes)}>
            <Stripe width="4rem" />
            <Stripe width="4rem" />
            <Stripe width="4rem" />
          </div>
        )}
        <div className={clx(classes.content, classes.LeftStripesContent)}>
          <Typography styleType="h5" color={contentColor} fontType="boldFont">
            {title?.value}
          </Typography>
          <Typography styleType="p2" color={contentColor}>
            {description?.value}
          </Typography>
        </div>

        <Button
          buttonSize="large"
          hoverVariant="primary"
          text={ctaTitle?.value}
          type="link"
          variant="secondary"
          className={clx(classes.Button, 'Button')}
          href={ctaLink?.value}
          target={urlTarget}
        />
      </div>
    )
  }
  const getRightStripesDesktopView = () => {
    return (
      <>
        <div className={clx(classes.content, classes.RightStripesContent)}>
          <Typography styleType="h5" color={contentColor} fontType="boldFont">
            {title?.value}
          </Typography>
          <Button
            buttonSize="large"
            hoverVariant="primary"
            text={ctaTitle?.value}
            type="link"
            variant="secondary"
            className={clx(classes.Button, 'Button')}
            href={ctaLink?.value}
            target={urlTarget}
          />
        </div>

        {showStripes?.value && (
          <div className={clx(classes.RightStripes)}>
            <Stripe width="100%" />
            <Stripe width="100%" />
            <Stripe width="100%" />
          </div>
        )}
      </>
    )
  }

  const getRightStripesMobileView = () => {
    return (
      <>
        <div
          className={clx(classes.content, classes.RightStripesContentMobile)}
        >
          <Typography
            styleType="h5"
            color={contentColor}
            fontType="boldFont"
            className={clx(classes.RightStripesContentValMobile)}
          >
            {title?.value}
          </Typography>
          {showStripes?.value && (
            <div className={clx(classes.RightStripesMobile)}>
              <Stripe width="100%" />
              <Stripe width="100%" />
              <Stripe width="100%" />
            </div>
          )}
        </div>
        <Button
          buttonSize="large"
          hoverVariant="primary"
          text={ctaTitle?.value}
          type="link"
          variant="secondary"
          className={clx(
            classes.Button,
            classes.RightStripeMobileButton,
            'Button',
          )}
          href={ctaLink?.value}
          target={urlTarget}
        />
      </>
    )
  }
  const getRightStripesContent = () => {
    return (
      <div
        className={clx(classes.contentWrapper, 'contentWrapper', {
          [classes.ShowRightStripes]: showStripes?.value,
        })}
      >
        {!mobileView
          ? getRightStripesDesktopView()
          : getRightStripesMobileView()}
      </div>
    )
  }
  return (
    <div
      className={clx(classes.wrapper, {
        [classes.electricity]: themeValue === 'electricity',
        [classes.white]: themeValue === 'white',
        [classes.gravity]: themeValue === 'gravity',
      })}
    >
      {stripesPositionVal == 'right'
        ? getRightStripesContent()
        : getLeftStripesContent()}
    </div>
  )
}

const Stripe = ({ width }: any) => {
  const classes = useStyles()
  return (
    <div
      className={clx(classes.stripe, 'stripe')}
      style={{
        width: `${width}`,
      }}
    >
      &nbsp;
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    padding: 0,
  },
  electricity: {
    '& .contentWrapper': {
      background: colors.main.greenishBlue,
    },
    '& .stripe': {
      backgroundColor: colors.main.brightRed,
    },
  },
  gravity: {
    '& .contentWrapper': {
      background: colors.main.darkShadeBlue,
    },
    '& .stripe': {
      backgroundColor: colors.main.greenishBlue,
    },
    '& .contentColor': {
      color: colors.main.white,
    },
    '& .Button': {
      background: colors.main.darkShadeBlue,
      borderColor: colors.main.white,
    },
  },
  white: {
    '& .contentWrapper': {
      background: colors.main.white,
    },
    '& .stripe': {
      backgroundColor: colors.main.red,
    },
  },
  contentWrapper: {
    display: 'flex',
    gap: '1rem',
    minHeight: '6rem',
    borderRadius: '1rem',
    padding: '2rem ',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      padding: '1rem',
    },
  },
  ShowLeftStripes: {
    padding: '2rem 2rem 2rem 0',
    [breakpoints.down('xs')]: {
      padding: '2rem 1rem',
    },
  },
  ShowRightStripes: {
    padding: '2rem 0 2rem 2rem',
    [breakpoints.down('xs')]: {
      padding: '2rem 0 2rem 1rem',
    },
  },
  RightStripeMobileButton: {
    marginRight: '1rem',
  },
  LeftStripesContent: {
    gap: '1rem',
    [breakpoints.down('xs')]: {
      gap: '.25rem',
    },
  },

  RightStripes: {
    flex: '40%',
  },
  RightStripesMobile: {
    flex: 1,
  },
  RightStripesContentValMobile: {
    flex: 1,
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  RightStripesContent: {
    flex: '60%',
    gap: '1rem',
  },
  RightStripesContentMobile: {
    gap: '1rem',
    display: 'flex',
    flexDirection: 'row',
  },
  stripe: {
    height: '22px',
    marginBottom: '11px',
  },
  stripes: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  Button: {
    width: 'max-content',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    minWidth: 'fit-content',
    [breakpoints.down('xs')]: {
      width: '100%',
      marginTop: '1rem',
    },
  },
}))

export default AddOnBanner
