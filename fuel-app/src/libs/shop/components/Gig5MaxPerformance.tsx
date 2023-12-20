import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData, useWindowDimensions } from 'src/hooks'
import { COMPONENT_WRAPPER, CTA_BUTTON, SITE_INTERACTION } from 'src/constants'
import Image from 'next/future/image'
import { IShopComponents } from './types'

const Gig5MaxPerformance = ({ styles }: IShopComponents) => {
  const { mainHeading, subHeading, list, image, mobileImage, button } =
    useAppData('Gig5MaxPerformance', true) || {}
  const { width } = useWindowDimensions()
  const midDevice = 768
  const classes = useStyles()
  if (!mainHeading || !subHeading) {
    return null
  }

  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = CHECK_AVAILABLITY_COMP.replace('{NAME}', button?.label)
  }
  return (
    <div
      className={classes.root}
      data-testId="gig5-max-performance"
      style={styles}
    >
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          {mainHeading?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h3"
              color="tertiary"
              data-testId="mainHeading"
              value={mainHeading?.value}
              className={classes.Header}
            />
          )}
          {subHeading?.value && (
            <InjectHTML
              value={subHeading?.value}
              styleType="h6"
              color="tertiary"
              className={classes.subHeader}
              data-testId="subHeading"
            />
          )}
        </div>
        <div className={classes.mainContainer}>
          <div className={classes.leftContent}>
            {list?.targetItems?.map((item: any, index: number) => (
              <div key={index} data-testId="list">
                <Typography
                  color="secondary"
                  className={classes.title}
                  tagType="h3"
                  styleType="h5"
                >
                  {item?.title?.value}
                </Typography>
                <Typography
                  color="tertiary"
                  className={classes.description}
                  tagType="p"
                  styleType="p1"
                >
                  {item?.description?.value}
                </Typography>
              </div>
            ))}
            <div className={classes.btnWrapper}>
              {button && (
                <Button
                  className={classes.btn}
                  text={button?.label}
                  type="link"
                  href={button?.url}
                  variant="white"
                  onClick={onButtonClick}
                  triggerEvent={true}
                  eventObj={{ events: 'event14', eVar14: CTA_BUTTON }}
                  interactionType={SITE_INTERACTION}
                  data-testId="buttonLink"
                />
              )}
            </div>
          </div>
          <div className={classes.rightContent}>
            <Image
              loader={() => (width > midDevice ? image?.src : mobileImage?.src)}
              className={classes.imageCard}
              data-testId="cardImage"
              src={width > midDevice ? image?.src : mobileImage?.src}
              alt={image?.alt}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gig5MaxPerformance

const useStyles = makeStyles(({ breakpoints }) => ({
  root: { backgroundColor: colors.main.dark },
  container: {
    position: 'relative',
    ...COMPONENT_WRAPPER,
    alignItems: 'flex-center',
    fontFamily: 'PP Object Sans Bold',
    color: colors.main.white,
    borderBottom: `1px solid ${colors.main.white}`,
    [breakpoints.up('xs')]: {
      paddingTop: '2rem',
      paddingBottom: '3rem',
    },
  },
  subHeader: {
    marginTop: '0.625rem',
    '& sup': {
      fontSize: '1rem',
    },
  },
  imageCard: {
    borderRadius: '1rem',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  leftContainer: {
    textAlign: 'center',
  },
  Header: {
    [breakpoints.down('xs')]: {
      '& br': { display: 'none' },
    },
  },
  title: {
    marginBottom: '0.5rem',
  },
  description: {
    marginTop: '0.125rem',
    marginBottom: '2rem !important',
  },

  mainContainer: {
    display: 'flex',
    marginTop: '1.56rem',
    [breakpoints.up('xs')]: {
      gap: '3rem',
    },
    [breakpoints.up('md')]: {
      gap: '5rem',
    },
    [breakpoints.down(768)]: {
      flexDirection: 'column-reverse',
      gap: '2rem',
    },
  },
  leftContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1.25rem',
  },

  rightContent: {
    marginTop: '1.875rem',
    [breakpoints.down('xs')]: {
      justifyContent: 'center',
      display: 'flex',
    },
  },
  btnWrapper: {
    marginTop: '1.25rem',
  },
  btn: {
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
      display: 'block',
    },
  },
}))
