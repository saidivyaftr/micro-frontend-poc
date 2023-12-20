import { makeStyles } from '@material-ui/core/styles'
import { Hero, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const HeroComponent = () => {
  const {
    firstTitle,
    secondTitle,
    thirdTitle,
    description,
    disclaimer,
    image,
    mobileImage,
  } = useAppData('heroBanner', true)
  const classes = useStyles()

  return (
    <Hero
      backgroundColor="gravity"
      backgroundImage={image?.src || ''}
      mobileBackgroundImage={mobileImage?.src}
      removeStripes={false}
      stripeStyles={{
        height: 50,
        marginBottom: 24,
      }}
      stripeColor="primary"
      content={
        <div>
          {firstTitle?.value && (
            <h1>
              <InjectHTML
                tagType="span"
                styleType="h1"
                className={classes.firstTitle}
                value={firstTitle?.value}
              />
              <InjectHTML
                tagType="span"
                styleType="h1"
                className={classes.secondTitle}
                value={secondTitle?.value}
              />
              <InjectHTML
                tagType="span"
                styleType="h1"
                className={classes.thirdTitle}
                value={thirdTitle?.value}
              />
            </h1>
          )}
          {description?.value && (
            <InjectHTML
              styleType="h6"
              tagType="p"
              fontType="boldFont"
              color="tertiary"
              className={classes.description}
              value={description?.value}
            />
          )}
          {disclaimer?.value && (
            <InjectHTML
              tagType="p"
              fontType="boldFont"
              color="tertiary"
              styleType="p3"
              className={classes.disclaimer}
              value={disclaimer?.value}
            />
          )}
        </div>
      }
    />
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  firstTitle: {
    color: colors.main.white,
    display: 'block',
    [breakpoints.down('xs')]: {
      fontSize: '30px',
    },
  },
  secondTitle: {
    color: colors.main.white,
    display: 'block',
    [breakpoints.down('xs')]: {
      fontSize: '30px',
    },
  },
  thirdTitle: {
    color: colors.main.white,
    display: 'block',
    [breakpoints.down('xs')]: {
      fontSize: '30px',
    },
    marginBottom: 8,
  },
  description: {
    marginBottom: '16px',
  },
  disclaimer: {
    lineHeight: '12px',
  },
}))

export default HeroComponent
