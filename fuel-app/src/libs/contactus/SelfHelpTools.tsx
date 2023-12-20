import { makeStyles, Grid } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import { RightArrowIcon } from '@/shared-ui/react-icons'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const QuickLinks = () => {
  const classes = useStyles()
  const quickLinksData = useAppData('selfHelpTools', true)
  if (Object.keys(quickLinksData)?.length === 0) {
    return null
  }

  const {
    title,
    secondTitle,
    actionCardOutageTitle,
    actionCardOutageLink,
    actionCardVisitTitle,
    actionCardVisitLink,
    actionCardBackgroundColor,
    links,
  } = quickLinksData

  return (
    <div className={classes.root} data-testid="QuickLinks">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <InjectHTML
            addAnchorStyles
            data-testid="faqTitle"
            tagType="h2"
            styleType="h4"
            className={classes.firstTitle}
            value={title?.value}
          />
          <Grid container spacing={2}>
            {links?.list?.map((item: any, index: number) => {
              return (
                <Grid
                  item
                  key={`action-card-${index}`}
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                >
                  <a
                    href={item?.href?.url}
                    id={item?.hrefId?.value}
                    className={classes.quickLinksCard}
                  >
                    <InjectHTML
                      addAnchorStyles
                      className={classes.quickLinkCardIcon}
                      value={item?.icon?.value}
                    />
                    <InjectHTML
                      addAnchorStyles
                      tagType="h3"
                      styleType="h6"
                      value={item?.title?.value}
                    />
                  </a>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          <InjectHTML
            addAnchorStyles
            data-testid="faqTitle"
            tagType="h2"
            styleType="h4"
            className={classes.secondTitle}
            value={secondTitle?.value}
          />
          <div
            style={{
              backgroundColor: actionCardBackgroundColor?.value,
            }}
            className={classes.actionCard}
          >
            <a
              href={actionCardOutageLink?.value}
              className={classes.actionCardIcon}
            >
              <InjectHTML
                addAnchorStyles
                tagType="h3"
                styleType="h5"
                value={actionCardOutageTitle?.value}
                className={classes.actionCardTitle}
              />
              <RightArrowIcon />
            </a>
          </div>
          <div
            style={{
              backgroundColor: actionCardBackgroundColor?.value,
            }}
            className={classes.actionCard}
          >
            <a
              href={actionCardVisitLink?.value}
              className={classes.actionCardIcon}
            >
              <InjectHTML
                addAnchorStyles
                tagType="h3"
                styleType="h5"
                value={actionCardVisitTitle?.value}
                className={classes.actionCardTitle}
              />
              <RightArrowIcon />
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
  },
  firstTitle: {
    margin: '32px auto',
    fontsize: '24px',
    [breakpoints.down('xs')]: {
      fontsize: '18px',
    },
  },
  secondTitle: {
    margin: '32px auto',
    fontsize: '24px',
    marginLeft: 10,
  },
  quickLinksCard: {
    border: `1px solid ${colors.main.borderGrey}`,
    borderRadius: 16,
    padding: 16,
    display: 'block',
    minHeight: 160,
    height: '100%',
    '&:hover': {
      boxShadow: '0px 0px 7px 3px rgb(0 0 0 / 9%)',
      '& h3': { color: colors.main.brightRed },
    },
    [breakpoints.down('xs')]: {
      minHeight: 'unset',
      border: 0,
      borderBottom: `1px solid ${colors.main.borderGrey}`,
      borderRadius: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 0,
      paddingBottom: 16,
      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
  },
  quickLinkCardIcon: {
    marginBottom: 18,
    height: 30,
    '& svg': {
      height: 30,
      width: 30,
    },
    [breakpoints.down('xs')]: {
      marginBottom: 0,
    },
  },
  actionCardIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16px 10px 16px 20px',
    borderRadius: 16,
    transition: '0.3s all',
    '&:hover': {
      color: colors.main.brightRed,
      boxShadow: '0px 0px 7px 3px rgb(0 0 0 / 9%)',
      '& h3': { color: colors.main.brightRed },
    },
  },
  actionCard: {
    border: '3 solid orange',
    borderRadius: 16,
    minHeight: '72px',
    height: '72px',
    marginBottom: '16px',
    '& svg': {
      marginLeft: '10px',
      paddingTop: '5px',
    },
    [breakpoints.up('lg')]: {
      marginLeft: 10,
      minHeight: 72,
    },
    [breakpoints.down('md')]: {
      width: '66%',
      maxHeight: '58px',
    },
    [breakpoints.down('xs')]: {
      width: '100%',
      maxHeight: '58px',
    },
  },
  actionCardTitle: {
    paddingTop: '7px',
    fontSize: 18,
    [breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
}))

export default QuickLinks
