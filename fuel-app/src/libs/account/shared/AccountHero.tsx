import { makeStyles } from '@material-ui/core'
import { Breadcrumb, InjectHTML } from 'src/blitz'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from 'src/styles/theme/colors'
import { AccountDropdown } from './AccountDropdown'
import { AccountTabView } from './AccountTabView'

interface PageProps {
  title?: string
  breadcrumb?: any
  dashboard?: boolean
  showAccountsDropdown?: boolean
  pageContent?: any
  tabs?: { url: string; title: string; component: any }[]
  wrapperClassName?: string
}

const AccountHero = ({
  title,
  breadcrumb,
  showAccountsDropdown = false,
  pageContent,
  tabs,
  wrapperClassName,
}: PageProps) => {
  const classes = useStyles()

  return (
    <div className={wrapperClassName}>
      <div className={classes.wrapper}>
        <div className={classes.breadcrumbWrapper}>
          <Breadcrumb
            variant="secondary"
            links={breadcrumb}
            breadCrumbClassName={classes.breadCrumbClassName}
          />
        </div>
        <div className={classes.container}>
          <div className={classes.leftPanel}>
            <InjectHTML
              className={classes.title}
              styleType="h1"
              tagType="h1"
              color="tertiary"
              value={title ?? ''}
            />
          </div>
          {showAccountsDropdown && (
            <div className={classes.rightPanel}>
              <AccountDropdown />
            </div>
          )}
        </div>
      </div>
      {pageContent && (
        <div className={classes.pageContentContainer}>{pageContent}</div>
      )}
      {(tabs?.length || 0) > 0 && (
        <div className={classes.tabContentContainer}>
          <AccountTabView tabs={tabs} />
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    width: '100%',
    height: '24rem',
    background: colors.main.dark,
  },
  container: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 60,
    gap: 32,
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '1rem',
      paddingTop: 32,
    },
  },
  leftPanel: {
    margin: '0',
    alignItems: 'flex-start',
  },
  rightPanel: {
    maxWidth: '25rem',
    height: 'fit-content',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '0.5rem',
    [breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
      maxWidth: 'unset',
      width: '100%',
    },
  },
  pageContentContainer: {
    margin: 'auto',
    marginTop: -50,
    maxWidth: 1232,
    padding: '0px 16px',
  },
  tabContentContainer: {
    margin: 'auto',
    marginTop: -58,
    maxWidth: 1232,
    padding: '0px 16px',
  },
  breadcrumbWrapper: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 32,
    '& .active-link': {
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
    '& a': {
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  breadCrumbClassName: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  title: {
    fontSize: '3rem',
    lineHeight: '3.5rem',
    [breakpoints.down('xs')]: {
      fontSize: '1.875rem',
      lineHeight: '2.375rem',
    },
  },
}))

export default AccountHero
