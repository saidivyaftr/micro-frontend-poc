/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core'
import { Typography, Hero } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

const HeroSection = ({ data }: any) => {
  const { title, backgroundColor, styleType, fontType, color } = data

  const classes = useStyles({
    backgroundColor: backgroundColor.Color || colors.main.dark,
  })()

  if (!data || Object.keys(data).length === 0) {
    return null
  }

  return (
    <Hero
      backgroundColor="gravity"
      data-testid="hero"
      className={classes.heroContainer}
      leftContentClassName={classes.leftContent}
      content={
        <>
          {title?.value && (
            <Typography
              styleType={styleType?.type?.field?.value || 'h2'}
              tagType="h1"
              fontType={fontType?.name?.field?.value || 'boldFont'}
              color={color?.Color?.field?.value || 'tertiary'}
            >
              {title?.value}
            </Typography>
          )}
        </>
      }
    />
  )
}

const useStyles = ({ backgroundColor }: any) =>
  makeStyles(({ breakpoints }) => ({
    container: {
      [breakpoints.down('xs')]: {},
    },
    heroContainer: {
      margin: 'auto',
      backgroundColor: backgroundColor,
      minHeight: 'min(21vw, 400px)',
      [breakpoints.down('xs')]: {
        backgroundSize: 'contain',
      },
    },
    leftContent: {
      maxWidth: 'unset',
      [breakpoints.down('xs')]: { minHeight: '375px' },
    },
  }))

export default HeroSection
