import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import clx from 'classnames'
const MobileApp = () => {
  const classes = useStyles()
  const { list } = useAppData('MobileAppScreens', true)
  return (
    <div className={classes.wrapper}>
      {list?.targetItems?.map((item: any, idx: number) => {
        return (
          <div
            key={idx}
            className={clx(classes.container, {
              [classes.reverseContainer]: item.imagePosition?.value == 'left',
            })}
            data-testid="mobile-app"
          >
            <div className={classes.content}>
              {item?.title?.value && (
                <Typography
                  tagType="h3"
                  styleType="h3"
                  data-testid={`mobile-app-title-${idx}`}
                >
                  {item?.title?.value}
                </Typography>
              )}
              {item?.description?.value && (
                <Typography
                  tagType="p"
                  styleType="p1"
                  className={clx({
                    [classes.description]: !idx,
                  })}
                >
                  {item?.description?.value}
                </Typography>
              )}
            </div>
            <div
              className={classes.imageContainer}
              style={{
                backgroundColor: item?.backgroundColor?.Color?.field?.value,
              }}
            >
              <div className={classes.stripesContainer}>
                <img
                  className={classes.image}
                  src={item?.image?.src}
                  alt={item?.image?.alt}
                />
              </div>
              <div className={classes.stripes}>
                <div
                  className={classes.stripe}
                  style={{
                    backgroundColor: item?.stripesColor?.Color?.field?.value,
                  }}
                ></div>
                <div
                  className={classes.stripe}
                  style={{
                    backgroundColor: item?.stripesColor?.Color?.field?.value,
                  }}
                ></div>
                <div
                  className={classes.stripe}
                  style={{
                    backgroundColor: item?.stripesColor?.Color?.field?.value,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingTop: '6.875rem',
    [breakpoints.down('sm')]: {
      paddingTop: '3.25rem',
    },
    display: 'flex',
    flexDirection: 'column',
    gap: '5rem',
    [breakpoints.down('xs')]: {
      gap: '3rem',
    },
  },
  reverseContainer: {
    flexDirection: 'row-reverse',
  },
  container: {
    display: 'flex',
    width: '100%',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  content: {
    flex: 1,
    flexBasis: '50%',
    padding: '4rem',
    [breakpoints.down('xs')]: {
      padding: '1rem 1rem 2rem 1rem',
    },
  },
  imageContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '2rem',
    flex: 1,
    flexBasis: '50%',
    paddingTop: '3rem',
    [breakpoints.down('sm')]: {
      padding: '5rem  2.25rem 0 2.25rem',
    },
  },
  image: {
    display: 'block',
    maxWidth: '100%',
  },
  stripes: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  stripesContainer: {
    position: 'relative',
    zIndex: 3,
    alignSelf: 'flex-end',
    maxWidth: '265px',
  },
  stripe: {
    marginBottom: '1rem',
    height: '2rem',
  },
  description: {
    maxWidth: '80%',
    [breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
}))

export default MobileApp
