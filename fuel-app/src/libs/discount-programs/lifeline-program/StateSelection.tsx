import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const StateSelection = () => {
  const classes = useStyles()
  const { title, description, cities } = useAppData('CityDetails', true)
  if (!cities?.list) return null
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.headerContainer}>
          <Typography tagType="h2" styleType="h3">
            {title?.value}
          </Typography>
          <Typography
            tagType="p"
            styleType="h5"
            className={classes.description}
          >
            {description?.value}
          </Typography>
        </div>
        <hr className={classes.horizontalDivider} />

        <div className={classes.cityContainer}>
          <ul className={classes.cityNameWrapperUL}>
            {cities?.list?.map(
              (city: { name: { value: string }; url: { value: string } }) => (
                <li
                  className={classes.cityNameWrapper}
                  data-testid="cityname"
                  key={city?.name?.value}
                >
                  {city?.url?.value ? (
                    <a
                      href={city?.url?.value}
                      className={classes.cityRedirectLink}
                    >
                      <Typography tagType="p" styleType="p1">
                        {city?.name?.value}
                      </Typography>
                    </a>
                  ) : (
                    <Typography tagType="p" styleType="p1">
                      {city?.name?.value}
                    </Typography>
                  )}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default StateSelection
const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    backgroundColor: colors.main.newBackgroundGray,
    padding: `${typography.pxToRem(80)} ${typography.pxToRem(120)}`,
    [breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  container: {
    maxWidth: 1200,
    margin: 'auto',
    backgroundColor: colors.main.white,
    borderRadius: `${typography.pxToRem(32)}`,
    padding: `${typography.pxToRem(48)} 0`,
    [breakpoints.down('sm')]: {
      borderRadius: 0,
      backgroundColor: colors.main.newBackgroundGray,
    },
  },
  headerContainer: {
    textAlign: 'center',
    padding: `0 ${typography.pxToRem(80)}`,
    [breakpoints.down('sm')]: {
      padding: `0 ${typography.pxToRem(16)}`,
    },
  },
  description: {
    margin: `${typography.pxToRem(16)} 0`,
  },
  horizontalDivider: {
    border: 'none',
    height: '2px',
    color: colors.main.midnightExpress,
    backgroundColor: colors.main.midnightExpress,
    margin: `${typography.pxToRem(48)} 0`,
    [breakpoints.down('sm')]: {
      margin: ` ${typography.pxToRem(32)} 0`,
    },
  },
  cityContainer: {
    padding: `0 ${typography.pxToRem(80)}`,
    [breakpoints.down('sm')]: {
      padding: `0 ${typography.pxToRem(16)}`,
    },
  },
  cityNameWrapperUL: {
    columnCount: 4,
    listStyle: 'none',
    flexWrap: 'wrap',
    width: '100%',
    padding: '0px',
    margin: '0px',
    [breakpoints.down('md')]: {
      columnCount: 2,
    },
  },
  cityNameWrapper: {
    '& p': { margin: 0 },
    breakInside: 'avoid',
    padding: '0.5rem 0 0.5rem 6px',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    [breakpoints.down('sm')]: {
      height: 50,
      alignItems: 'start',
    },
  },
  cityRedirectLink: {
    textDecoration: 'underline',
    textUnderlineOffset: '1px',
    textDecorationThickness: '1px',
    fontSize: '18px',
    lineHeight: '1.625rem',
    display: 'block',
    fontWeight: 700,
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    '&:hover': {
      color: colors.main.brightRed,
      '& p': {
        color: colors.main.brightRed,
      },
    },
  },
}))
