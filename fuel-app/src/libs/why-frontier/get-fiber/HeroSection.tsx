import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { InjectHTML, Typography } from '@/shared-ui/components'
import HeroWrapper from '@/shared-ui/components/HeroWrapper'
const HeroSection = () => {
  const data = useAppData('HeroSection', true)
  const classes = useStyles()()

  if (Object.keys(data)?.length === 0) {
    return null
  }
  const { firstTitle, secondTitle, legalText } = data

  return (
    <HeroWrapper
      className={classes.root}
      rootBackgroundColorLeft={
        data?.rootBackgroundColorLeft?.Color?.field?.value
      }
      rootBackgroundColorRight={
        data?.rootBackgroundColorRight?.Color?.field?.value
      }
    >
      <div className={classes.wrapper}>
        <div>
          <InjectHTML
            tagType="h1"
            styleType="h1"
            color="secondary"
            value={firstTitle?.value}
            className={classes.firstTitle}
          />

          <Typography
            tagType="h1"
            styleType="h1"
            color="tertiary"
            className={classes.secondTitle}
          >
            {secondTitle?.value}
          </Typography>
          {legalText && (
            <InjectHTML
              color={'tertiary'}
              className={classes.legalText}
              tagType="p"
              data-testid="caption"
              styleType="p3"
              value={legalText?.value as string}
            />
          )}
        </div>
      </div>
    </HeroWrapper>
  )
}

const useStyles = () =>
  makeStyles(({ breakpoints }) => ({
    root: {
      backgroundColor: colors.main.dark,
    },
    wrapper: {
      ...COMPONENT_WRAPPER,
      display: 'flex',
      minHeight: '600px',
      alignItems: 'center',
      [breakpoints.down('md')]: {
        padding: '0 32px',
        minHeight: '460px',
      },
    },
    secondTitle: {
      lineHeight: '4.875rem',
      fontWeight: 400,
      [breakpoints.down('xs')]: {
        lineHeight: '2.75rem',
      },
    },
    firstTitle: {
      lineHeight: '4.875rem',
      fontWeight: 400,
      [breakpoints.down('xs')]: {
        lineHeight: '2.75rem',
      },
    },
    legalText: {
      marginTop: '1rem',
      marginBottom: 0,
      maxWidth: 350,
      [breakpoints.down('xs')]: {
        marginTop: '0.5rem',
        maxWidth: 'unset',
      },
    },
  }))

export default HeroSection
