import { makeStyles } from '@material-ui/core'
import { Button, Picture, Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { RightArrowIcon } from '@/shared-ui/react-icons'
import { COMPONENT_WRAPPER, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'

interface ItemModel {
  fundingImage: { src: any; alt: string }
  fundingMobileImage: { src: any }
  title: { value: string | JSX.Element | undefined }
  description: { value: string | JSX.Element | undefined }
  cta: { url: string | undefined }
}
const Funding = () => {
  const { title, description, items } = useAppData('Funding', true)
  const classes = useStyles()
  const getBackGroundColor = (index: number) => {
    switch (index) {
      case 0:
        return classes.skyBlue
      case 1:
        return classes.black
      default:
        return classes.white
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          {title?.value && (
            <Typography tagType="h2" styleType="h3">
              {title?.value}
            </Typography>
          )}
          {description?.value && (
            <Typography
              tagType="p"
              styleType="h6"
              className={classes.headerDescription}
            >
              {description?.value}
            </Typography>
          )}
        </div>
        <div className={classes.body}>
          {items?.targetItems.map((item: ItemModel, index: number) => (
            <div className={classes.content} key={index}>
              <Picture
                desktop={{
                  image: item?.fundingImage?.src,
                }}
                mobile={{
                  image: item?.fundingMobileImage?.src,
                }}
                altText={item?.fundingImage?.alt}
                className={`${classes.imgContainer} ${getBackGroundColor(
                  index,
                )} `}
              />
              <Typography tagType="h3" styleType="h5">
                {item.title?.value}
              </Typography>
              <Typography tagType="p" styleType="p1">
                {item.description?.value}
              </Typography>
              <div className={classes.icon}>
                <Button
                  type="link"
                  variant="lite"
                  href={item.cta?.url}
                  text={<RightArrowIcon />}
                  triggerEvent={true}
                  eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
                  interactionType={SITE_INTERACTION}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    backgroundColor: colors.main.newBackgroundGray,
    padding: `${typography.pxToRem(80)} 0 0`,
    [breakpoints.down('sm')]: {
      padding: `${typography.pxToRem(64)} 0 0 `,
    },
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
  },
  header: {
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      margin: '0',
    },
  },
  headerDescription: {
    margin: `${typography.pxToRem(16)} ${typography.pxToRem(24)} `,
    [breakpoints.down('sm')]: {
      marginBottom: `${typography.pxToRem(27)}`,
    },
  },
  body: {
    display: 'flex',
    flex: 1,
    textAlign: 'center',
    marginTop: `${typography.pxToRem(64)}`,
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: 0,
    },
  },
  content: {
    margin: `0 ${typography.pxToRem(27)}`,
    [breakpoints.down('sm')]: {
      margin: `${typography.pxToRem(37)} ${typography.pxToRem(9)}`,
    },
  },
  icon: {
    textAlign: 'center',
    margin: `${typography.pxToRem(32)} 0`,
    [breakpoints.down('sm')]: {
      margin: `${typography.pxToRem(24)} 0`,
      marginBottom: 0,
    },
  },
  imgContainer: {
    borderRadius: `50%`,
    backgroundColor: colors.main.blackBackground,
    marginBottom: `${typography.pxToRem(32)}`,
  },
  skyBlue: {
    backgroundColor: colors.main.greenishBlue,
  },
  black: {
    backgroundColor: colors.main.blackBackground,
  },
  white: {
    backgroundColor: colors.main.white,
  },
}))

export default Funding
