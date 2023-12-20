import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Magnify } from '@/shared-ui/react-icons'
import YextSnippet from 'src/utils/yext'
import { BreadcrumbNav } from 'src/libs/helpcenter/common'
import { useRouter } from 'next/router'
import { useUpdateSearchPlaceholder } from 'src/hooks'

const BreadCrumbAndSearchBar = () => {
  const classes = useStyles()
  const { query } = useRouter() || {}
  useUpdateSearchPlaceholder()
  const { category = '', articlePath = [] } = query || {}
  const articlePathRoute =
    typeof articlePath === 'string' ? articlePath : articlePath.join('/')
  const pathname = `helpcenter/${category}/${articlePathRoute}`

  return (
    <div className={classes.root}>
      <div className={classes.innerWrapper}>
        <div className={classes.breadCrumb}>
          <BreadcrumbNav
            variant="secondary"
            url={pathname}
            className={classes.breadCrumbNav}
          />
        </div>
        <div className={classes.searchContainer}>
          <Magnify />
          <div className={classes.yextSearchWrapper}>
            <div className="yext-search-container-help-center"></div>
            <YextSnippet />
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: colors.main.midnightExpress,
    padding: '25px',
    [breakpoints.down('xs')]: {
      marginTop: 0,
      display: 'block',
      alignItems: 'center',
      padding: '15px 15px',
    },
    [breakpoints.up('md')]: {
      padding: '0 25px',
      marginTop: 30,
    },
  },
  innerWrapper: {
    maxWidth: 1232,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  breadCrumb: {
    color: colors.main.white,
  },
  breadCrumbNav: {
    margin: 0,
  },
  yextSearchWrapper: {
    maxWidth: 700,
    width: '100%',
    position: 'relative',
    '& .yext-search-container-help-center': {
      height: 58,
    },
    '& .yext-search-container-help-center input': {
      width: '100%',
      borderRadius: 30,
      flex: 1,
      height: 58,
      border: 0,
      outline: 'none',
      fontSize: '18px',
      fontFamily: 'PP Object Sans Bold',
      [breakpoints.down('xs')]: {
        fontSize: '16px',
      },
    },
    '& .yxt-SearchBar-container': {
      border: '0 !important',
      background: 'transparent',
      zIndex: 99,
      boxShadow: 'none !important',
    },
    '& .yxt-SearchBar-form': {
      '& button': {
        display: 'none',
      },
    },
    '& .yxt-AutoComplete-option': {
      fontFamily: 'PP Object Sans',
      padding: '6px 16px',
    },
    '& .yxt-AutoComplete-wrapper': {
      backgroundColor: 'transparent',
    },
    '& .yxt-AutoComplete': {
      backgroundColor: colors.main.white,
      border: `1px solid ${colors.main.borderGrey}`,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      borderRadius: 16,
      borderTop: 0,
      marginTop: 6,
      paddingTop: 10,
      '&::before': { display: 'none' },
    },
  },
  searchContainer: {
    width: 'calc(50%)',
    marginTop: 36,
    marginBottom: 31,
    marginRight: 16,
    borderRadius: 30,
    display: 'flex',
    padding: '0px 16px',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.main.white,
    '& svg': {
      height: 18,
      width: 18,
      '& path': {
        fill: colors.main.grayOpacity50,
      },
    },
    [breakpoints.down('sm')]: {
      margin: '25px 0px',
      width: 'calc(100%)',
    },
  },
}))

export default BreadCrumbAndSearchBar
