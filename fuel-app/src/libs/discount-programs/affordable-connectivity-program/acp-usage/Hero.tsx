import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const Hero = () => {
  const styles = useStyles()
  const { subTitle, title, description } = useAppData('heroData', true)

  return (
    <div className={styles.root}>
      <div className={styles.innerWrapper}>
        <div>
          {subTitle?.value && (
            <Typography
              color="tertiary"
              tagType="p"
              styleType="p1"
              className={styles.preTitle}
            >
              {subTitle?.value}
            </Typography>
          )}
          {title?.value && (
            <Typography
              styleType="h1"
              tagType="h1"
              color="secondary"
              fontType="boldFont"
              className={styles.title}
            >
              {title?.value}
            </Typography>
          )}
          {description?.value && (
            <InjectHTML
              color="tertiary"
              tagType="p"
              styleType="p1"
              fontType="boldFont"
              value={description?.value}
              className={styles.description}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.dark,
  },
  innerWrapper: {
    ...COMPONENT_WRAPPER,
    padding: '7.5rem 1rem',
    [breakpoints.down('sm')]: {
      padding: '4.5rem 1rem',
    },
  },

  title: {
    textTransform: 'none',
    marginBottom: 16,
  },
  preTitle: {
    textTransform: 'uppercase',
    fontWeight: 700,
  },
  description: {
    '& sup': { lineHeight: '0' },
    '& br': {
      [breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
}))

export default Hero
