import colors from '@/shared-ui/colors'
import {
  InjectHTML,
  Picture,
  TooltipPopover,
  Typography,
} from '@/shared-ui/components'
import { InfoIconWhite } from '@/shared-ui/react-icons'
import { Grid, makeStyles, Zoom } from '@material-ui/core'
import clx from 'classnames'
import { useMemo } from 'react'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const ImageBoxText = () => {
  const classes = useStyles()
  const { list } = useAppData('imageBoxData', true)
  const imageList = useMemo(() => {
    return list?.list?.map((item: any) => ({
      backgroundColor: item?.backgroundColor?.Color?.field?.value,
      direction: item?.direction?.direction?.field?.value,
      smDirection: item?.smDirection?.direction?.field?.value,
      textColor: item?.textColor?.Color?.field?.value,
      image: item?.image?.src,
      imagewebp: item?.imagewebp?.src,
      mobileimg: item?.mobileImage?.src,
      imageAlt: item?.image?.alt,
      title: item?.title?.value,
      description: item?.description?.value,
      tooltip: item?.tooltipText?.value,
      tooltiphovervariant: item?.tooltipvariant?.variant?.field?.value,
      legalText: item?.legalText?.value,
      image2: item?.image2?.src,
      image2Alt: item?.image2?.alt,
    }))
  }, [list])

  if (Object.keys(list)?.length === 0) {
    return null
  }

  return (
    <div id="image-box-text" className={classes.root}>
      {imageList?.map((data: any, index: number) => (
        <ImageBox data={data} key={index} />
      ))}
    </div>
  )
}

const ImageBox = ({ data }: any) => {
  const color = getFontColor(data?.textColor)
  const classes = imageBoxStyles({
    direction: data?.direction,
    smDirection: data?.smDirection,
    color,
  })

  const image2Source = data?.image2

  return (
    <div
      id={`image-box-${data?.title}`}
      className={classes.rootImage}
      style={{
        backgroundColor: getBackGroundColor(data?.backgroundColor),
        color,
      }}
    >
      <Grid
        container
        className={classes.outerContainer}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          md={6}
          sm={12}
          className={`${
            data?.direction === 'row'
              ? classes.leftContainer
              : classes.rightContainer
          }`}
        >
          <div className={classes.imgWrapper}>
            <Zoom timeout={100}>
              <Picture
                testId="cardImage"
                desktop={{
                  image: data?.image,
                  webp: data?.imagewebp,
                }}
                mobile={{
                  image: data?.mobileimg,
                }}
                altText={data?.imageAlt}
                width="100%"
                height="100%"
              />
            </Zoom>
          </div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={clx({ [classes.section]: image2Source })}>
            <div className={clx({ [classes.item]: image2Source })}>
              <InjectHTML
                className={classes.title}
                tagType="h2"
                styleType="h3"
                fontType="boldFont"
                value={data?.title}
              />
              <Typography
                tagType="p"
                styleType="h6"
                className={classes.description}
              >
                <>
                  {data?.description}
                  {data?.tooltip && (
                    <TooltipPopover
                      tooltipIcon={<InfoIconWhite />}
                      tooltipContent={data?.tooltip}
                      tooltipDirection={'bottom'}
                      variant={data?.tooltiphovervariant}
                    />
                  )}
                </>
              </Typography>
              {data?.legalText && (
                <InjectHTML
                  className={classes.legalText}
                  tagType="p"
                  data-testid="caption"
                  styleType="legal"
                  value={data?.legalText}
                />
              )}
            </div>
            {image2Source && (
              <div className={classes.item}>
                <Zoom timeout={100}>
                  <Picture
                    className={classes.image2}
                    testId="cardImage"
                    desktop={{
                      image: image2Source,
                      webp: image2Source,
                    }}
                    mobile={{
                      image: image2Source,
                    }}
                    altText={data?.image2Alt}
                    width="100%"
                    height="100%"
                  />
                </Zoom>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const getBackGroundColor = (color: string) => {
  switch (color) {
    case 'red':
      return colors.main.brightRed
    case 'greenish-blue':
      return colors.main.greenishBlue
    case '#141928':
      return colors.main.midnightExpress
    default:
      return colors.main.white
  }
}

const getFontColor = (color: string) => {
  switch (color) {
    case 'black':
      return colors.main.midnightExpress
    default:
      return colors.main.white
  }
}
const imageBoxStyles = makeStyles(({ breakpoints, typography }) => ({
  outerContainer: ({ direction, smDirection }: any) => ({
    ...COMPONENT_WRAPPER,
    padding: '2rem 1rem',
    maxHeight: 364,
    flexDirection: direction,
    [breakpoints.down('sm')]: {
      padding: 32,
      maxHeight: 'none',
      flexDirection: smDirection,
      flexWrap: 'nowrap',
      alignItems: 'flex-start',
    },
  }),
  imgWrapper: {
    maxWidth: '100%',
    overflow: 'hidden',
    '& img': {
      borderRadius: 32,
    },
  },
  section: ({ smDirection }: any) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: smDirection === 'column' ? 'row-reverse' : 'row',
    gap: 16,
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  }),
  item: {
    '& img': {
      paddingLeft: '16px',
      [breakpoints.up('sm')]: { minWidth: '9.125rem', minHeight: '10.75rem' },
      [breakpoints.down('sm')]: {
        paddingLeft: 0,
        paddingTop: '1rem',
        maxWidth: '6rem',
        maxHeight: '7.05rem',
      },
    },
  },
  leftContainer: {
    paddingRight: 66,
    [breakpoints.down('xs')]: {
      paddingTop: 32,
      paddingBottom: 25,
    },
    [breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingTop: 32,
    },
  },
  rightContainer: {
    paddingLeft: 66,
    [breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingTop: 32,
    },
    [breakpoints.down('xs')]: {
      paddingBottom: 32,
    },
  },
  rootImage: {
    '&:first-child': {
      paddingTop: '40px',
    },
    [breakpoints.down('sm')]: {
      '&:first-child': {
        paddingTop: '30px',
      },
    },
  },
  description: {
    margin: 0,
    color: 'inherit',
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  title: {
    marginBottom: typography.pxToRem(32),
    maxWidth: '100%',
    color: 'inherit',
    [breakpoints.down('sm')]: {
      marginBottom: typography.pxToRem(16),
      fontSize: '1.5rem',
    },
  },
  tooltip: ({ color }: any) => ({
    display: 'inline',
    top: '-1.2px',
    '& path': {
      fill: color,
    },
  }),
  legalText: {
    color: 'inherit',
  },
  image2: {
    height: 140,
    width: 140,
    minHeight: '140px !important',
    minWidth: '140px !important',
    objectFit: 'contain',
    padding: '0 !important',
    [breakpoints.down('xs')]: {
      height: 92,
      width: 92,
      minHeight: '92px !important',
      minWidth: '92px !important',
    },
  },
}))

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.down('sm')]: {
      marginTop: '0px',
    },
  },
}))

export default ImageBoxText
