import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { Typography } from '@/shared-ui/components'
import clx from 'classnames'
import { useRouter } from 'next/router'

interface AccountTabViewProps {
  tabs?: { url: string; title: string; component: any }[]
}

export const AccountTabView = ({ tabs }: AccountTabViewProps) => {
  const router = useRouter()
  const classes = useStyles()
  const selectedTabIndex =
    tabs?.findIndex((tab) => tab.url === router.pathname) ?? 0

  const onTabChange = (url: string) => {
    router.push(
      {
        pathname: url,
        query: router.query,
      },
      undefined,
      {
        shallow: false,
      },
    )
  }

  return (
    <div>
      <Grid container>
        {tabs?.map(({ url, title }, index: number) => {
          return (
            <Grid
              item
              xs={6}
              sm={4}
              key={`tabs-${index}`}
              onClick={() => onTabChange(url)}
              role="button"
              className={clx(classes.tab, {
                [classes.selectedTab]: router.pathname === url,
              })}
            >
              <Typography
                tagType="h6"
                styleType="h6"
                color="tertiary"
                className={classes.tabPadding}
              >
                {title}
              </Typography>
            </Grid>
          )
        })}
      </Grid>
      <div>{tabs?.[selectedTabIndex]?.component}</div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  tabPadding: {
    padding: '8px 0px',
    [breakpoints.down('xs')]: {
      padding: '0px',
    },
  },
  selectedTab: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: 3,
      backgroundColor: colors.main.brightRed,
      bottom: 0,
    },
  },
  tab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    textAlign: 'center',
    height: 58,
    [breakpoints.down('xs')]: {
      padding: '16px 8px',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
}))
