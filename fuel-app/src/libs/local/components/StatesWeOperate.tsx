import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Typography } from '@/shared-ui/components'

type State = {
  name: string
  url?: string
}

const StatesWeOperate = ({ data }: any) => {
  const classes = useStyles()

  const { stateList, title } = data

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div className={classes.root} data-testid="statesWeOperate">
      <div className={classes.container}>
        <div>
          <div className={classes.titleWrapper}>
            <Typography tagType="h2" styleType="h3" className={classes.title}>
              {title?.value}
            </Typography>
          </div>
        </div>
        <div className={classes.stateNameWrapper}>
          {stateList?.length ? (
            <ul className={classes.stateNameWrapperUL}>
              {stateList?.map((state: State) => {
                if (state?.url) {
                  return (
                    <li
                      data-testid="statename"
                      key={state?.name}
                      className={`${classes.stateLinkWrapper} activeStateName`}
                    >
                      <a
                        href={state?.url}
                        className={classes.stateRedirectLink}
                      >
                        <Typography
                          className={classes.stateName}
                          tagType="p"
                          styleType="p1"
                          fontType="mediumFont"
                        >
                          {state?.name}
                        </Typography>
                      </a>
                    </li>
                  )
                }
                return (
                  <li
                    className={classes.stateLinkWrapper}
                    data-testid="cityname"
                    key={state?.name}
                  >
                    <Typography
                      className={classes.stateName}
                      tagType="p"
                      styleType="p1"
                    >
                      {state?.name}
                    </Typography>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.blue,
    color: colors.main.white,
  },
  container: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '80px 0px',
    [breakpoints.down('md')]: {
      padding: '2.25rem 1rem',
    },
  },
  title: {
    paddingLeft: '2rem',
    paddingRight: '2rem',
    [breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'left',
      padding: 0,
    },
  },
  stateNameWrapper: {
    borderTop: `2px solid ${colors.main.black}`,
    marginTop: '3rem',
    paddingTop: '3rem',
    [breakpoints.down('sm')]: {
      marginTop: '2rem',
      paddingTop: '2rem',
    },
  },
  stateNameWrapperUL: {
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
  stateLinkWrapper: {
    breakInside: 'avoid',
    padding: '6px 0 6px 10px',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    [breakpoints.down('md')]: {
      padding: '6px 0 6px',
      height: 50,
      alignItems: 'start',
    },
    '&.activeStateName': {
      '& a': {
        width: '100%',
        display: 'contents',
        '& p': {
          textDecoration: 'underline',
        },
        '& :hover': {
          color: colors.main.brightRed,
        },
      },
    },
  },
  stateName: {
    margin: '6px 0px',
    [breakpoints.down('md')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  stateRedirectLink: {
    textDecoration: 'underline',
    textUnderlineOffset: '1px',
    textDecorationThickness: '1px',
    fontSize: '18px',
    lineHeight: '1.625rem',
    display: 'block',
    fontWeight: 500,
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
}))

export default StatesWeOperate
