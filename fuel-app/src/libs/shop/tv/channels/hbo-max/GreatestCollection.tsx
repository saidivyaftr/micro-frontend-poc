import colors from '@/shared-ui/colors'
import { InjectHTML } from '@/shared-ui/components'
import { Grid, makeStyles } from '@material-ui/core'
import clx from 'classnames'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

const GreatestCollection = () => {
  const classes = useStyles()
  const { mdImages, title, smImages }: any = useAppData(
    'greatestCollection',
    true,
  )

  if (!title?.value) {
    return null
  }

  return (
    <div id="greatest-collection" className={classes.root}>
      <div className={classes.container}>
        <Grid container>
          <Grid item md={12} sm={12}>
            <InjectHTML
              color="tertiary"
              className={classes.mainTitle}
              tagType="h3"
              styleType="h3"
              value={title?.value}
            />
          </Grid>
        </Grid>
        <div>
          <Grid container>
            <Grid item md={12} sm={12}>
              <div className={classes.cardsContainer}>
                {mdImages?.targetItems?.map((image: any) => (
                  <img
                    key={image?.image?.alt}
                    alt={image?.image?.alt}
                    src={image?.image?.src}
                    className={classes.mdImages}
                    loading="lazy"
                  />
                ))}
              </div>
              <div
                className={clx(
                  classes.cardsContainer,
                  classes.cardsSubContainer,
                )}
              >
                {smImages?.targetItems?.map((image: any) => (
                  <img
                    key={image?.image?.alt}
                    alt={image?.image?.alt}
                    src={image?.image?.src}
                    className={classes.smImages}
                    loading="lazy"
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default GreatestCollection

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: '80px 16px 48px',
    backgroundColor: colors.main.midnightExpress,
    [breakpoints.down('md')]: {
      padding: '0 16px 48px 16px',
    },
  },
  container: {
    ...COMPONENT_WRAPPER,
    maxWidth: '1428px',
    [breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  card: {
    backgroundColor: colors.main.midnightExpress,
    padding: '2rem 2rem 1rem 2rem',
    width: '23%',
    [breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '2rem',
      padding: '1rem 1em 0rem 1rem',
    },
  },
  cardsContainer: {
    display: 'flex',
    gap: '1rem',
    [breakpoints.down('sm')]: {
      gap: '0.5rem',
      flexDirection: 'column',
    },
  },
  cardsSubContainer: {
    marginTop: '1rem',
    [breakpoints.down('sm')]: {
      marginTop: '0.5rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: '0.5rem',
    },
  },
  mdImages: {
    width: '50%',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  smImages: {
    width: '100%',
  },
  mainTitle: {
    textAlign: 'center',
    maxWidth: 854,
    margin: 'auto',
    paddingBottom: '3rem',
    [breakpoints.down('sm')]: {
      paddingBottom: '1rem',
    },
  },
}))
