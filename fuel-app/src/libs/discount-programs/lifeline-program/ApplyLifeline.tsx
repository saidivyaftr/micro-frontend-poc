import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
import { RightArrowIcon } from '@/shared-ui/react-icons'
const ApplyLifeline = () => {
  const classes = useStyles()
  const { title, tiles }: any = useAppData('ApplyLifeline', true)

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = tiles?.list.map((item: any) => {
      const button = {
        text:
          item?.buttonVariant?.value == 'lite' ? (
            <>
              {item?.buttonText?.value}
              <RightArrowIcon />
            </>
          ) : (
            item.buttonText?.value
          ),
        variant: item.buttonVariant?.value,
        buttonHoverVariant: item?.buttonHoverVariant?.value,
        href: item.buttonhref?.url,
        objectID:
          item?.icon?.value === '3' ? 'hero-check-availability' : undefined,
      }
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.value,
        button: button,
        icon: (
          <Typography styleType="h1" color="secondary">
            {item?.icon?.value}
          </Typography>
        ),
      }
      return payload
    })
    return tilesList
  }, [tiles])

  if (!tiles?.list) {
    return null
  }

  return (
    <div id="special-about-fiber">
      <div className={classes.wrapper}>
        {title?.value && (
          <Typography
            tagType="h2"
            styleType="h4"
            color="default"
            className={classes.title}
          >
            {title?.value}
          </Typography>
        )}
        <div className={classes.tilesWrapper}>
          <FourTiles
            type="light"
            textAlign="left"
            tiles={list}
            titleStyleType="h5"
            roundedBorders={true}
            cardClassName={classes.cardClassName}
            descriptionClassName={classes.descriptionClassName}
            buttonClassName={classes.buttonClassName}
            buttonWrapperClass={classes.buttonWrapperClass}
            titleClassName={classes.titleStyles}
            isClickable={false}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 80,
    paddingTop: 80,
    [breakpoints.down('xs')]: {
      paddingBottom: 50,
      paddingTop: 32,
    },
  },
  title: {
    marginBottom: '2rem',
  },
  buttonWrapperClass: {
    width: 'unset',
  },
  buttonClassName: {
    width: 'unset',
    color: colors.main.white,
    textDecoration: 'none !important',
    [breakpoints.down('md')]: {
      fontSize: '1rem',
    },
    '& svg': {
      transform: 'rotate(325deg)',
      [breakpoints.down('xs')]: {
        transform: 'rotate(0deg)',
        width: '20px',
        position: 'relative',
        top: '3px',
      },
    },
  },
  cardClassName: {
    display: 'flex',
    padding: 32,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.main.midnightExpress,
    [breakpoints.down('md')]: {
      padding: '2rem',
    },
  },
  descriptionClassName: {
    flex: '1',
    marginTop: '1rem',
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    color: colors.main.white,
    marginBottom: '2rem',
    [breakpoints.down('md')]: {
      marginTop: '0',
    },
  },
  tilesWrapper: {
    marginTop: 32,
  },
  titleStyles: {
    color: colors.main.greenishBlue,
    marginBottom: 0,
  },
  iconStyles: {
    color: colors.main.greenishBlue,
  },
}))

export default ApplyLifeline
