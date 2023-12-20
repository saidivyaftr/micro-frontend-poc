import colors from '@/shared-ui/colors'
import {
  Button,
  InjectHTML,
  TooltipPopover,
  Typography,
} from '@/shared-ui/components'
import { InfoIconWhite, RightArrowIcon } from '@/shared-ui/react-icons'
import { makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import {
  COMPONENT_WRAPPER,
  CTA_BUTTON,
  SITE_INTERACTION,
  WIFI_CONNECTION_PAGE,
} from 'src/constants'
import { useAppData } from 'src/hooks'
import useWindowDimensions from 'src/hooks/useWindowDimensions'

const GetSupport = () => {
  const { width } = useWindowDimensions()
  const isMobileOrTablet = width <= 1023
  const classes = useStyles()
  const data = useAppData('getSupport', true)
  const { title, supportList: tiles }: any = data

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = tiles?.list?.map((item: any) => {
      return {
        image: item?.image,
        mobileImage: item?.mobileImage,
        backgroundColor: item?.backgroundColor?.Color?.field?.value,
        title: item?.title?.value,
        description: item?.description?.value,
        toolTip: item?.toolTip?.value,
        button: item?.button,
      }
    })
    return tilesList
  }, [tiles])

  if (!title?.value) {
    return null
  }

  const content = (item: any) => {
    return (
      <div
        data-testid="image-tile"
        className={classes.tileContainer}
        key={item?.title}
      >
        {item.mobileImage?.src && item.image?.src && (
          <img
            id="image"
            style={{
              backgroundColor: item?.backgroundColor,
            }}
            className={classes.img}
            alt={item?.image?.alt}
            src={isMobileOrTablet ? item?.mobileImage?.src : item?.image?.src}
          />
        )}

        <div className={classes.imageDescription}>
          {item?.title && (
            <Typography
              data-testid="test-title"
              styleType="h5"
              tagType="h3"
              className={classes.title}
            >
              {item?.title}
            </Typography>
          )}
          <div>
            {item?.description && (
              <InjectHTML
                data-testid="test-description"
                value={item?.description}
                tagType="div"
                styleType="p1"
                className={classes.description}
              />
            )}
            {item?.toolTip && (
              <TooltipPopover
                tooltipDirection={'bottom'}
                tooltipContent={item?.toolTip}
                tooltipIcon={<InfoIconWhite />}
              />
            )}
          </div>
          {item?.button?.text && (
            <div className={classes.btnContainer}>
              <Button
                type="link"
                variant="lite"
                text={item?.button?.text}
                href={item?.button?.url}
                className={classes.btn}
                triggerEvent={true}
                eventObj={{
                  events: 'event14',
                  eVar14: `${WIFI_CONNECTION_PAGE}:${CTA_BUTTON}:${item?.button?.text}`,
                }}
                interactionType={SITE_INTERACTION}
              />

              <RightArrowIcon />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div data-testid="get-support" className={classes.wrapper}>
      <InjectHTML
        value={title?.value}
        tagType="h2"
        styleType="h3"
        className={classes.title}
      />
      <div className={classes.tilesWrapper}>
        {list?.map((item: any) => content(item))}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '80px 16px 60px 16px',
    [breakpoints.down('xs')]: {
      padding: '32px 16px 0px 16px',
    },
  },

  title: {
    '& br': {
      display: 'none',
      [breakpoints.down('xs')]: {
        display: 'unset',
      },
    },
    marginBottom: '2rem',
  },
  description: {
    display: 'initial',
    '& a': {
      fontWeight: 600,
      '&:hover': {
        color: colors.main.brightRed,
      },
      textDecoration: 'underline',
    },
  },
  tilesWrapper: {
    marginTop: 32,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '2rem',
    justifyContent: 'center',
    [breakpoints.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  tileContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: '16px',
  },
  imageDescription: {
    display: 'flex',
    padding: '2rem',
    flexDirection: 'column',
    [breakpoints.down('xs')]: { padding: '1rem' },
  },
  btnContainer: {
    marginTop: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    '& svg': {
      width: 20.91,
      height: 10,
    },
    [breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  btn: {
    minWidth: 'unset',
    height: 'unset',
    textDecoration: 'underline',
    [breakpoints.down('xs')]: {
      paddingRight: '0.625rem !important',
    },
  },
}))

export default GetSupport
