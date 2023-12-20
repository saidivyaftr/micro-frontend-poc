import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Typography } from '@/shared-ui/components'

interface SwiperTabsProps {
  tabs: string[]
  selectedTabIndex: number
  // eslint-disable-next-line no-unused-vars
  setSelectedTab: (newTab: number) => void
}

const BetterGamingTabs = ({
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
            xs={6}
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
              color={'tertiary'}
              styleType="h6"
              tagType="span"
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
    borderBottom: `3px solid ${colors.main.grayOpacity50}`,
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
      padding: '16px 8px',
    },
  },
  tab: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    textAlign: 'center',
    [breakpoints.down('xs')]: {
      padding: '16px 8px',
    },
  },
}))

export default BetterGamingTabs
