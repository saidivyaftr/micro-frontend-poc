import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import {
  Typography,
  InjectHTML,
  Button,
  TooltipPopover,
} from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { InfoIconWhite } from '@/shared-ui/react-icons'
import { PP_OBJECT_SANS } from 'src/constants/fontFamilyNames'
import { useAppData } from 'src/hooks'

const PayBillOnline = () => {
  const classes = useStyles()
  const { title, subTitle, subTitle1, tiles, tooltipContent }: any =
    useAppData('payBillOnline', true) || {}
  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    } else {
      return tiles?.list
    }
  }, [tiles])

  if (!tiles?.list) {
    return null
  }
  return (
    <div id="more" data-testid="pay-bill-online">
      <div className={classes.wrapper}>
        {title?.value && (
          <InjectHTML
            tagType="h2"
            styleType="h3"
            className={classes.title}
            value={title?.value}
            data-testid="pay-bill-online-title"
          />
        )}
        {subTitle?.value && (
          <Typography
            className={classes.subTitle}
            styleType="h5"
            data-testid="pay-bill-online-subtitle"
          >
            {subTitle?.value}
          </Typography>
        )}
        {subTitle1?.value && (
          <div className={classes.toolTipStyles}>
            <div>
              <Typography
                className={classes.subTitle}
                styleType="h5"
                tagType="span"
              >
                {subTitle1?.value}
              </Typography>
              <TooltipPopover
                tooltipContent={tooltipContent?.value}
                dropShadow={false}
                tooltipIcon={<InfoIconWhite />}
              />
            </div>
          </div>
        )}
        {tiles?.list && (
          <div className={classes.cardsWrapper}>
            {list?.map((tile: any, index: number) => {
              return (
                <div
                  className={classes.cardStyles}
                  key={index}
                  data-testid="pay-bill-online-tile"
                >
                  {tile?.icon?.rendered && (
                    <InjectHTML
                      className={classes.iconStyles}
                      styleType="h1"
                      value={tile?.icon?.rendered}
                      color="secondary"
                    />
                  )}
                  {tile?.title?.value && (
                    <Typography tagType="h3" styleType="h4">
                      {tile?.title?.value}
                    </Typography>
                  )}
                  {tile?.description?.value && (
                    <Typography
                      tagType="p"
                      styleType="p1"
                      className={classes.descriptionStyles}
                    >
                      {tile?.description?.value}
                    </Typography>
                  )}
                  {tile?.buttonText?.value && (
                    <div className={classes.buttonWrapper}>
                      <Button
                        text={tile?.buttonText?.value}
                        type="link"
                        hoverVariant={
                          tile?.buttonHoverVariant?.targetItem?.type?.value
                        }
                        variant="tertiary"
                        className={classes.buttonStyles}
                        href={tile?.buttonhref?.url}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 80,
    paddingTop: 66,
    [breakpoints.down('sm')]: {
      paddingBottom: 0,
      paddingTop: '3rem',
    },
  },
  descriptionStyles: {
    marginBottom: 32,
    marginTop: 10,
    [breakpoints.down('xs')]: {
      margin: '10px 0px 16px 0px',
    },
  },
  subTitle: {
    textAlign: 'center',
    margin: 0,
  },

  toolTipStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    '& span': {
      color: colors.main.brightRed,
    },
  },
  tileCard: {
    paddingBottom: 60,
  },
  cardsWrapper: {
    marginTop: 32,
    display: 'flex',
    gap: 32,
    [breakpoints.down('xs')]: {
      marginTop: 10,
      flexDirection: 'column',
      gap: 16,
    },
  },
  iconStyles: {
    marginBottom: 34,
    lineHeight: 1,
    fontSize: '1px',
    display: 'inline-block',
    minHeight: 44,
    [breakpoints.down('xs')]: {
      minHeight: 'auto',
      marginBottom: 16,
    },
    '& svg, img': {
      objectFit: 'contain',
      width: 'auto',
      height: 'auto',
      [breakpoints.down('xs')]: {
        height: 32,
      },
    },
  },
  cardStyles: {
    padding: '32px',
    borderRight: `1px solid ${colors.main.borderGrey}`,
    '&:last-child': {
      border: 'none',
    },
    [breakpoints.down('xs')]: {
      border: 'none',
      borderBottom: `1px solid ${colors.main.borderGrey}`,
    },
  },
  buttonStyles: {
    display: 'block',
    alignItems: 'center',
    fontFamily: PP_OBJECT_SANS,
    '& svg': {
      width: 16,
      height: 10,
    },
  },
  buttonWrapper: {
    display: 'inline-block',
    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}))

export default PayBillOnline
