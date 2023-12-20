import { makeStyles, Grid } from '@material-ui/core'
import { Typography, InjectHTML, RichText } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'
const midDevice = 768
const StayConnectedLoop = () => {
  const styles = useStyles()
  const { width } = useWindowDimensions()
  const { list, title, subTitle } = useAppData('StayConnectedLoop', true)

  if (!list?.targetItems.length) return null

  return (
    <div
      id="stay-connected"
      className={styles.root}
      data-testid="stay-connected"
    >
      <Grid container>
        <Grid item md={12} className={styles.titleContainer}>
          {title?.value && (
            <Typography tagType="h2" styleType="h3" className={styles.heading}>
              {title.value}
            </Typography>
          )}
          {subTitle?.value && (
            <Typography
              tagType="p"
              styleType="p1"
              className={styles.subHeading}
            >
              {subTitle.value}
            </Typography>
          )}
        </Grid>
        {list?.targetItems?.map((item: any, key: number) => {
          return (
            <Grid
              key={key}
              container
              className={styles.innerContainer}
              direction={item?.direction?.item?.value?.value}
            >
              <Grid item sm={5} xs={12}>
                <div className={styles.wrapper}>
                  <InjectHTML
                    tagType="h3"
                    styleType="h4"
                    className={styles.title}
                    value={item?.title?.value}
                  />

                  <RichText
                    wrapperClassName={styles.contentStyles}
                    data={{
                      content: {
                        value: item?.description.value,
                      },
                    }}
                  />
                </div>
              </Grid>
              <Grid item sm={7} xs={12}>
                <div className={styles.figure}>
                  <img
                    className={styles.image}
                    width="100%"
                    src={
                      width > midDevice
                        ? item?.image?.src
                        : item?.mobileImage?.src
                    }
                    alt={item?.image?.alt}
                    loading="lazy"
                    data-testid="stay-connected-list-image"
                  />
                </div>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '5rem 16px 0px 16px',
    '& .MuiGrid-item': {
      overflow: 'hidden',
      [breakpoints.down('xs')]: {
        maxWidth: 'unset',
        flexBasis: 'unset',
      },
    },
    [breakpoints.down('sm')]: {
      padding: '2.5rem 1rem 0rem 1rem',
    },
  },
  figure: {
    overflow: 'hidden',
    height: '100%',
    backgroundColor: colors.main.newBackgroundGray,
  },
  image: {
    height: '100%',
    [breakpoints.up('sm')]: {
      objectFit: 'cover',
      display: 'flex',
    },
  },
  heading: {
    marginBottom: 40,
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },
  subHeading: {
    margin: '0 0 3rem',
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      margin: '0 0 52px',
    },
  },
  wrapper: {
    paddingTop: '4rem',
    paddingRight: '4rem',
    paddingLeft: '4rem',
    minHeight: 400,
    backgroundColor: colors.main.dark,
    [breakpoints.up('sm')]: {
      height: '100%',
    },
    [breakpoints.down('xs')]: {
      padding: '2rem',
      minHeight: 'auto',
    },
  },
  title: {
    marginBottom: '1rem',
    color: colors.main.greenishBlue,
    [breakpoints.down('xs')]: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
  },
  contentStyles: {
    padding: '0',
    '& li:before': {
      backgroundColor: `${colors.main.white} !important`,
    },
    '& li': {
      color: colors.main.white,
    },
  },
  innerContainer: {
    borderRadius: '2rem',
    overflow: 'hidden',
    marginBottom: '5rem',
    [breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      marginBottom: '2.5rem',
    },
  },
  titleContainer: {
    [breakpoints.down('sm')]: {
      flexBasis: '100% !important',
    },
  },
}))

export default StayConnectedLoop
