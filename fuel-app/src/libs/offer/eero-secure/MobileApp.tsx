import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import clx from 'classnames'
const MobileApp = () => {
  const classes = useStyles()
  const data = useAppData('MobileAppScreens', true)
  const { list, title, subTitle } = data

  if (Object.keys(data).length === 0) return null

  return (
    <div className={classes.wrapper} data-testid="mobileApp">
      <Typography
        tagType="h2"
        styleType="h3"
        className={classes.h2Title}
        data-testid="mobileApp-title"
      >
        {title?.value}
      </Typography>
      <Typography
        className={classes.title}
        styleType="p1"
        data-testid="mobileApp-subTitle"
      >
        {subTitle?.value}
      </Typography>
      <div className={classes.cardsWrapper} data-testid="mobileApp-list">
        {list?.targetItems?.map((item: any, idx: number) => {
          return (
            <div
              data-testid="mobileApp-listItem"
              key={idx}
              className={clx(classes.container, {
                [classes.reverseContainer]:
                  item.imagePosition?.value?.field?.value == 'left',
              })}
            >
              <div className={classes.content}>
                {item?.title?.value && (
                  <Typography tagType="h3" styleType="h4">
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
                <img
                  className={classes.image}
                  src={item?.image?.src}
                  alt={item?.image?.alt}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    marginTop: 80,
    [breakpoints.down('xs')]: {
      marginTop: 48,
    },
  },
  cardsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8rem',
    [breakpoints.down('xs')]: {
      gap: '1rem',
    },
  },
  reverseContainer: {
    flexDirection: 'row-reverse',
  },
  container: {
    display: 'flex',
    width: '100%',
    [breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  title: {
    textAlign: 'center',
    maxWidth: 650,
    margin: '0px auto 75px auto',
    [breakpoints.down('xs')]: {
      marginBottom: 40,
    },
  },
  h2Title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  content: {
    width: '40%',
    padding: '4rem',
    [breakpoints.down('xs')]: {
      padding: '2rem 1rem 1rem 1rem',
      width: '100%',
    },
  },
  imageContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '2rem',
    width: 'calc(58% + 4px)',
    paddingTop: '2rem',
    [breakpoints.down('xs')]: {
      paddingTop: '1rem',
      width: '100%',
    },
  },
  image: {
    zIndex: 2,
    maxWidth: '300px',
    width: '100%',
    [breakpoints.down('xs')]: {
      maxWidth: '65%',
    },
  },
  description: {
    maxWidth: '80%',
    [breakpoints.down('md')]: {
      maxWidth: '100%',
    },
  },
}))

export default MobileApp
