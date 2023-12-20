import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const Hero = () => {
  const styles = useStyles()
  const { eyebrowTitle, title, description } = useAppData('heroData', true)
  if (!title?.value || !eyebrowTitle?.value) return null

  return (
    <div className={styles.root}>
      <div className={styles.innerWrapper}>
        <div>
          {eyebrowTitle?.value && (
            <Typography
              color="tertiary"
              tagType="p"
              styleType="p1"
              className={styles.eyebrowTitle}
            >
              {eyebrowTitle?.value}
            </Typography>
          )}
          {title?.value && (
            <InjectHTML
              styleType="h1"
              tagType="h1"
              color="secondary"
              fontType="boldFont"
              className={styles.title}
              value={title?.value}
            />
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
    padding: '3.125rem 1rem 10.625rem 1rem',
    [breakpoints.down('sm')]: {
      padding: '9.125rem 1rem',
    },
  },

  title: {
    textTransform: 'none',
    marginBottom: 16,
  },
  eyebrowTitle: {
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
