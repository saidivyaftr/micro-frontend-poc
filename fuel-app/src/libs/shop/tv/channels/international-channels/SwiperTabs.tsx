import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import clx from 'classnames'

interface SwiperTabsProps {
  tabs: string[]
  selectedTabIndex: number
  gridBlocksCount?: any
  tabsClassName?: string
  // eslint-disable-next-line no-unused-vars
  setSelectedTab: (newTab: number) => void
}

const SwiperTabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
  gridBlocksCount = 4,
  tabsClassName = '',
}: SwiperTabsProps) => {
  const classes = useStyles()
  return (
    <Grid container className={clx(classes.tabsRoot, tabsClassName)}>
      {tabs?.map((tab: string, index: number) => {
        return (
          <Grid
            item
            xs={gridBlocksCount}
            key={`Swiper-tabs-${index}`}
            onClick={() => setSelectedTab(index)}
            role="button"
            data-testid={`Swiper-tabs-${index}`}
            className={
              index === selectedTabIndex ? classes.selectedTab : classes.tab
            }
          >
            {tab}
          </Grid>
        )
      })}
    </Grid>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  tabsRoot: {
    borderBottom: `3px solid ${colors.main.lightGray}`,
    MsOverflowStyle: 'none',
    scrollbarColor: 'transparent transparent',
    '&::-webkit-scrollbar': {
      width: 0,
    },
    [breakpoints.down('xs')]: {
      border: 'none',
    },
  },
  selectedTab: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'PP Object Sans Bold',
    fontWeight: 700,
    fontSize: 18,
    color: colors.main.brightRed,
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
      padding: '16px 13px',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      minWidth: '118px',
      marginBottom: 3,
    },
  },
  tab: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'PP Object Sans Bold',
    fontWeight: 700,
    fontSize: 18,
    cursor: 'pointer',
    textAlign: 'center',
    '&:hover': {
      color: colors.main.brightRed,
    },
    [breakpoints.down('xs')]: {
      padding: '16px 13px',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      minWidth: '118px',
      marginBottom: 3,
    },
  },
}))

export default SwiperTabs
