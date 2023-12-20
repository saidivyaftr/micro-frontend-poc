import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import colors from 'src/styles/theme/colors'
import { Typography } from 'src/blitz'

interface SwiperTabsProps {
  tabs: string[]
  selectedTabIndex: number
  // eslint-disable-next-line no-unused-vars
  setSelectedTab: (newTab: number) => void
}

const SwiperTabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: SwiperTabsProps) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.tabsRoot}>
      {tabs?.map((tab: string, index: number) => {
        return (
          <Grid
            item
            xs={3}
            key={`Swiper-tabs-${index}`}
            onClick={() => setSelectedTab(index)}
            role="button"
            data-testid={`Swiper-tabs-${index}`}
            className={
              index === selectedTabIndex ? classes.selectedTab : classes.tab
            }
          >
            <Typography
              fontType="boldFont"
              color={index === selectedTabIndex ? 'primary' : 'default'}
              tagType="h6"
              styleType="h6"
              className={classes.tabTitle}
            >
              {tab}
            </Typography>
          </Grid>
        )
      })}
    </Grid>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  tabsRoot: {
    borderBottom: `4px solid ${colors.main.borderLightGray}`,
  },
  selectedTab: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    textAlign: 'center',
    '&:after': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: 3,
      backgroundColor: colors.main.brightRed,
      bottom: -3,
    },
    [breakpoints.down('xs')]: {
      padding: '16px 10px',
    },
  },
  tab: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    textAlign: 'center',
    '& h6': {
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
    [breakpoints.down('xs')]: {
      padding: '16px 10px',
    },
  },
  tabTitle: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 700,
    [breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },
}))

export default SwiperTabs
