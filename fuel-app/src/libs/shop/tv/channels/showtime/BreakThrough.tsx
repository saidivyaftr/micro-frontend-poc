import colors from '@/shared-ui/colors'
import { Picture, Typography } from '@/shared-ui/components'
import { useAppData } from '@/shared-ui/hooks/index'
import { makeStyles } from '@material-ui/core'
import { useMemo } from 'react'
import { COMPONENT_WRAPPER } from 'src/constants'
import useWindowDimensions from 'src/hooks/useWindowDimensions'

const BreakThrough = () => {
  const classes = useStyles()
  const { width } = useWindowDimensions()
  const isMobileOrTablet = width <= 1023
  const data = useAppData('breakThrough', true)
  const {
    title,
    description,
    mobilebanner,
    desktopbanner,
    list: images,
  }: any = data

  const list = useMemo(() => {
    if (!images?.targetItems) {
      return []
    }

    const imageList = images?.targetItems?.map((item: any) => {
      return {
        image: item?.image,
        mobileImage: item?.mobileimage,
      }
    })
    return imageList
  }, [images])

  const content = (item: any) => {
    return (
      <div
        data-testid="image-tile"
        className={classes.imageContainer}
        key={item?.image?.alt}
      >
        {item?.image?.src && item?.mobileImage?.src && (
          <img
            data-testid="image"
            className={classes.img}
            alt={item?.image?.alt}
            src={isMobileOrTablet ? item?.mobileImage?.src : item?.image?.src}
          />
        )}
      </div>
    )
  }

  if (!title?.value && !description?.value) return null

  return (
    <div data-testid="break-through" className={classes.root}>
      <div className={classes.container}>
        <div className={classes.heading}>
          <Typography tagType="h2" styleType="h3" color="tertiary">
            {title?.value}
          </Typography>
          <Typography tagType="p" styleType="h4" color="tertiary">
            {description?.value}
          </Typography>
        </div>
        <Picture
          altText={desktopbanner?.alt}
          desktop={{
            image: `${desktopbanner?.src}`,
          }}
          tablet={{
            image: `${desktopbanner?.src}`,
          }}
          mobile={{
            image: `${mobilebanner?.src}`,
          }}
          className={classes.bannerImg}
        />
        <div className={classes.imagesWrapper}>
          {list?.map((item: any) => content(item))}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    backgroundColor: `${colors.main.midnightExpress}`,
  },
  container: {
    ...COMPONENT_WRAPPER,
    padding: `${typography.pxToRem(80)} 0 ${typography.pxToRem(80)} 0`,
    [breakpoints.down('sm')]: {
      padding: `${typography.pxToRem(48)} ${typography.pxToRem(16)}`,
    },
  },
  heading: {
    textAlign: 'center',
    margin: `0 ${typography.pxToRem(170)} ${typography.pxToRem(
      64,
    )} ${typography.pxToRem(170)}`,
    [breakpoints.down('sm')]: {
      margin: `0 0 ${typography.pxToRem(16)} 0`,
    },
  },
  bannerImg: {
    width: '100%',
    height: 'auto',
  },
  imagesWrapper: {
    marginTop: 16,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem',
    justifyContent: 'center',
    [breakpoints.down('xs')]: {
      marginTop: 8,
      gridGap: '0.5rem',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
  },
}))

export default BreakThrough
