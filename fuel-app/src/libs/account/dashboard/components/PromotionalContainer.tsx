import { makeStyles } from '@material-ui/core'
import { Typography, Button, InjectHTML } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import clx from 'classnames'
import { useAppData } from 'src/hooks'

const PromotionalContainer = () => {
  const classes = useStyles()
  const {
    title,
    description,
    ctaTitle,
    ctaLink,
    theme,
    upgradeLabel,
    icon,
    type,
    openInNewTab,
  } = useAppData('promotionContainer', true)
  const themeType = theme?.targetItem?.value?.value
  const contentColor = themeType == 'gravity' ? 'tertiary' : 'default'
  const isIconAvailable = icon && icon?.value
  const urlTarget =
    openInNewTab || openInNewTab?.value == true ? '_blank' : '_self'

  const getTypetwoContent = () => {
    return (
      <>
        <div className={clx(classes.titleBanner, 'titleBanner')}>
          <Typography
            className={clx(classes.upgardeTypeTwo)}
            fontType="boldFont"
          >
            {upgradeLabel?.value}
          </Typography>
        </div>
        <div className={clx('contentBanner', classes.contentBanner)}>
          <InjectHTML
            addAnchorStyles
            className={classes.icon}
            value={icon?.value}
          />
          <InjectHTML
            styleType="p1"
            value={title?.value}
            color={contentColor}
            fontType="boldFont"
          ></InjectHTML>
          {description?.value && (
            <InjectHTML
              styleType="p2"
              color={contentColor}
              value={description?.value}
            ></InjectHTML>
          )}

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
      </>
    )
  }

  const getTypeOneContent = () => {
    return (
      <div
        className={clx(classes.contentWrapper, 'contentWrapper', {
          [classes.contentWrapperStripes]: !isIconAvailable,
        })}
      >
        {isIconAvailable ? (
          <div className={clx(classes.TitleWrapper)}>
            <InjectHTML
              addAnchorStyles
              className={classes.icon}
              value={icon?.value}
            />
            <div className={clx(classes.content)}>
              <Typography
                className={clx(classes.upgarde)}
                styleType="p2"
                color={contentColor}
              >
                {upgradeLabel?.value}
              </Typography>
              <Typography
                styleType="h5"
                color={contentColor}
                fontType="boldFont"
              >
                {title?.value}
              </Typography>
            </div>
          </div>
        ) : (
          <>
            <Typography
              className={clx(classes.upgarde)}
              styleType="p2"
              color={contentColor}
            >
              {upgradeLabel?.value}
            </Typography>
            <div className={clx(classes.contentStripes)}>
              <Typography
                className={clx(classes.titleColumn)}
                styleType="h5"
                color={contentColor}
                fontType="boldFont"
              >
                {title?.value}
              </Typography>

              <div className={clx(classes.stripes)}>
                <Stripe width="100%" />
                <Stripe width="100%" />
                <Stripe width="100%" className={classes.lastStripe} />
              </div>
            </div>
          </>
        )}

        {description?.value && (
          <Typography styleType="p2" fontType="boldFont" color={contentColor}>
            {description?.value}
          </Typography>
        )}
        <div
          className={clx(classes.ButtonWrapper, {
            [classes.ButtonWithStripes]: !isIconAvailable,
          })}
        >
          <Button
            buttonSize="medium"
            hoverVariant="primary"
            text={ctaTitle?.value}
            type="link"
            variant="secondary"
            className={clx(classes.Button, 'Button')}
            href={ctaLink?.value}
            target={urlTarget}
          />
        </div>
      </div>
    )
  }
  return (
    <div
      className={clx({
        [classes.electricity]: themeType === 'electricity',
        [classes.white]: themeType === 'white',
        [classes.gravity]: themeType === 'gravity',
      })}
    >
      {type?.targetItem?.value?.value == 'type2'
        ? getTypetwoContent()
        : getTypeOneContent()}
    </div>
  )
}

const Stripe = ({ width, className }: any) => {
  const classes = useStyles()
  return (
    <div
      className={clx(classes.stripe, 'stripe', className)}
      style={{
        width: `${width}`,
      }}
    >
      &nbsp;
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  TitleWrapper: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    alignSelf: 'start',
  },
  electricity: {
    '& .contentWrapper': {
      background: colors.main.greenishBlue,
    },
    '& .stripe': {
      backgroundColor: colors.main.brightRed,
    },
    '& .titleBanner': {
      background: colors.main.white,
    },
    '& .contentBanner': {
      background: colors.main.greenishBlue,
    },
  },
  gravity: {
    '& .contentWrapper': {
      background: colors.main.darkShadeBlue,
    },
    '& .stripe': {
      backgroundColor: colors.main.brightRed,
    },
    '& .contentColor': {
      color: colors.main.white,
    },
    '& .titleBanner': {
      background: colors.main.greenishBlue,
    },
    '& .contentBanner': {
      background: colors.main.darkShadeBlue,
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
      backgroundColor: colors.main.brightRed,
    },
    '& .titleBanner': {
      background: colors.main.greenishBlue,
    },
    '& .contentBanner': {
      background: colors.main.white,
    },
  },
  contentWrapper: {
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    minHeight: '6rem',
    borderRadius: '1rem',
    padding: '1rem',
    alignItems: 'flex-start',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  stripes: {
    flex: 1,
  },
  contentWrapperStripes: {
    paddingRight: 0,
  },
  upgarde: {
    alignSelf: 'start',
  },
  RightStripeMobileButton: {
    marginRight: '1rem',
  },
  titleColumn: {
    width: '10.625rem',
    [breakpoints.down('xs')]: {
      width: '7.625rem',
    },
  },

  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '.25rem',
  },
  contentStripes: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
  },
  stripe: {
    height: '0.75rem',
    marginBottom: '0.375rem',
  },
  lastStripe: {
    marginBottom: 0,
  },
  Button: {
    width: 'max-content',
    minWidth: 'fit-content',
    marginTop: '1rem',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  ButtonWrapper: {
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  ButtonWithStripes: {
    width: '100%',
    paddingRight: '1rem',
  },
  icon: {
    color: colors.main.brightRed,
    width: '27',
    height: '27',
  },
  titleBanner: {
    height: '34px',
    borderRadius: '1rem 1rem 0 0',
  },
  upgardeTypeTwo: {
    fontSize: '0.875rem',
    lineHeight: '1.125rem',
    padding: '.5rem 1rem',
    textAlign: 'center',
    width: '100%',
  },
  contentBanner: {
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    minHeight: '6rem',
    borderRadius: '0 0 1rem 1rem',
    padding: '2rem 1rem',
    alignItems: 'flex-start',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}))

export default PromotionalContainer
