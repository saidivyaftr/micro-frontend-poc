import { makeStyles } from '@material-ui/core'
import dynamic from 'next/dynamic';
import data from "./data.json"
import {getSecondaryNavItems} from "./helper"
const Header = dynamic(
  () => {
      return import('components/Header');
  },
  { ssr: false },
);
const TopBar = ()=> {
  const classes = useStyles()
  const { action_nav_links = [], main_links = {} } = data;
  // const { sites } = useAppData('Sticky Navigation', true, stickyData)
  const secondaryNav = getSecondaryNavItems(action_nav_links);

  return (
    <div className={classes.root}>
      <Header
        secondaryNav={secondaryNav}
        utilityNav={action_nav_links}
        menu={[]} 
      />
    </div>
  )
}

export default TopBar

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
  },
  searchIcon: {
    position: 'absolute',
    top: '16px',
    zIndex: 99,
    right: '16px',
  },
}))
