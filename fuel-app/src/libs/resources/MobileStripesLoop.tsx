import { makeStyles } from '@material-ui/core'
import { useRouter } from 'next/router'
import { Button, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'

const MobileStripesLoop = ({ data }: any) => {
  const classes = useStyles()
  const router = useRouter()
  const { title, subTitle, list } = data

  if (Object.keys(data)?.length === 0) {
    return null
  }
  return (
    <div className={classes.wrapper} data-testid="MobileStripesLoopData-info">
      {title?.value && (
        <Typography tagType="h2" styleType="h3">
          {title?.value}
        </Typography>
      )}
      {subTitle?.value && (
        <Typography tagType="h3" styleType="h6">
          {subTitle?.value}
        </Typography>
      )}
      {list?.targetItems?.map((item: any, idx: number) => (
        <div
          key={idx}
          className={`${classes.container} ${
            item.imagePosition?.position?.field?.value == 'left'
              ? classes.reverseContainer
              : ''
          }`}
        >
          <div className={classes.content}>
            {item?.title?.value && (
              <Typography tagType="h3" styleType="h5">
                {item?.title?.value}
              </Typography>
            )}
            {item?.description?.value && (
              <Typography tagType="p" styleType="p1">
                {item?.description?.value}
              </Typography>
            )}
            {item?.button?.btnText && (
              <Button
                type="button"
                className={classes.itemButton}
                onClick={() => router.push(item?.button?.btnURL || '')}
                text={item?.button?.btnText}
              />
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
              alt={item?.image?.src}
            />
            {item?.stripesColor?.Color?.field?.value && (
              <div className={classes.stripes}>
                <div
                  className={classes.stripe}
                  style={{
                    backgroundColor: item.stripesColor.Color.field.value,
                  }}
                ></div>
                <div
                  className={classes.stripe}
                  style={{
                    backgroundColor: item.stripesColor.Color.field.value,
                  }}
                ></div>
                <div
                  className={classes.stripe}
                  style={{
                    backgroundColor: item.stripesColor.Color.field.value,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingTop: '4rem',
    [breakpoints.down('sm')]: {
      paddingTop: '3.25rem',
    },
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    marginBottom: '5rem',
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
      flexDirection: 'column',
    },
  },
  content: {
    flex: 1,
    flexBasis: '50%',
    padding: '4rem',
    [breakpoints.down('xs')]: {
      padding: '2rem 0rem',
    },
  },
  imageContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '2rem',
    flex: 1,
    flexBasis: '70%',
    paddingTop: '2.25rem',
    [breakpoints.down('xs')]: {
      padding: '1.5rem 2rem 0',
    },
  },
  image: {
    zIndex: 2,
    maxWidth: '100%',
    height: '100%',
    [breakpoints.down('sm')]: {
      height: 'fit-content',
    },
  },
  stripes: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  stripe: {
    marginBottom: '1rem',
    height: '2rem',
    [breakpoints.down('sm')]: {
      marginBottom: '0.5rem',
      height: '1rem',
    },
  },
  itemButton: {
    background: 'primary',
    color: colors.main.white,
    marginTop: 20,
    width: '12.125rem',
    padding: '10px 32px',
    fontFamily: 'PP Object Sans',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

export default MobileStripesLoop
