import { makeStyles, Grid } from '@material-ui/core'
import { Typography, InjectHTML, TooltipPopover } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData, useWindowDimensions } from 'src/hooks'
import InfoIconWhite from '@/shared-ui/react-icons/info-icon-white'
const midDevice = 768
const FiberServices = () => {
  const styles = useStyles()
  const { width } = useWindowDimensions()
  const {
    list: { targetItems = [] },
    title,
    subTitle,
  } = useAppData('fiberServices', true)

  if (!targetItems.length) return null

  return (
    <div id="fiber-impact" className={styles.root}>
      <Grid container>
        <Grid item md={12}>
          <Typography tagType="h2" styleType="h3" className={styles.heading}>
            {title?.value}
          </Typography>
          <Typography tagType="p" styleType="p1" className={styles.subHeading}>
            {subTitle?.value}
          </Typography>
        </Grid>
        {targetItems?.map((item: any, key: number) => {
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
                    styleType="h3"
                    className={styles.title}
                    value={item?.title?.value}
                  />
                  <InjectHTML
                    tagType="p"
                    styleType="p1"
                    className={styles.contentStyles}
                    value={item?.description?.value}
                  />
                  {item?.tooltipText?.value && (
                    <TooltipPopover
                      tooltipContent={item?.tooltipText?.value}
                      tooltipDirection={'bottom'}
                      tooltipIcon={<InfoIconWhite />}
                    />
                  )}
                  {item?.legalText?.value && (
                    <InjectHTML
                      className={styles.legalText}
                      tagType="p"
                      data-testid="caption"
                      styleType="legal"
                      value={item?.legalText?.value}
                    />
                  )}
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
    padding: '3.75rem 16px 0px 16px',
    '& .MuiGrid-item': {
      overflow: 'hidden',
      [breakpoints.down('xs')]: {
        maxWidth: 'unset',
        flexBasis: 'unset',
      },
    },
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem 0rem 1rem',
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
    marginBottom: 16,
    textAlign: 'center',
  },
  subHeading: {
    margin: '0 0 3rem',
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      margin: '0 0 52px',
    },
  },
  wrapper: {
    padding: '56px 66px',
    minHeight: 400,
    backgroundColor: colors.main.newBackgroundGray,
    [breakpoints.up('lg')]: {
      height: '100%',
    },
    [breakpoints.up('sm')]: {
      padding: 30,
      minHeight: 330,
    },
    [breakpoints.down('xs')]: {
      padding: '1rem',
      minHeight: 'auto',
    },
  },
  title: {
    marginBottom: '1rem',
    [breakpoints.down('xs')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },
  contentStyles: {
    margin: 0,
    display: 'inline',
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  innerContainer: {
    borderRadius: '2rem',
    overflow: 'hidden',
    marginBottom: '2rem',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },

  legalText: {
    color: 'inherit',
  },
}))

export default FiberServices
