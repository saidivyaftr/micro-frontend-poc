/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER, SITE_INTERACTION } from 'src/constants'
import { useAppData } from '../../hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const SiteMapHelp = () => {
  const { links, heading, href } = useAppData('SiteMapHelp', true) || {}

  const classes = useStyles()
  const onLinkClick = (link: string) => {
    if (link)
      DTMClient.triggerEvent(
        { events: 'event14', eVar14: link },
        'tl_o',
        SITE_INTERACTION,
      )
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapper}>
        <div>
          <Typography fontType="boldFont" className={classes.mainHeading}>
            <a href={href?.value}>{heading?.value}</a>
          </Typography>
        </div>
        <hr className={classes.border} />
        <div className={classes.linksContainer}>
          {links.map(({ title, children }: any, index: number) => {
            return (
              <div
                key={`sitemap-column-${index}`}
                className={classes.footerLinksColumn}
              >
                <Typography
                  testId="test-mainlink-category"
                  tagType="h2"
                  styleType="p2"
                  fontType="boldFont"
                  className={classes.heading}
                >
                  {title?.value}
                </Typography>
                <ul className={classes.subListContainer}>
                  {children?.map(({ title, href }: any) => {
                    return (
                      <li key={`sitemap-column-${index}-${title.value}`}>
                        <a
                          href={href.value}
                          onClick={() => onLinkClick(title.value)}
                        >
                          <Typography
                            tagType="span"
                            styleType="p3"
                            fontType="boldFont"
                            className={classes.title}
                          >
                            {title?.value}
                          </Typography>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    margin: '0 auto',
  },
  mainHeading: {
    fontSize: '26px',
    lineHeight: '1.1',
    '&:hover': {
      textDecoration: 'underline',
      color: colors.main.brightRed,
    },
  },
  contentWrapper: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  heading: {
    margin: '10px 0',
  },
  title: {
    '&:hover': {
      textDecoration: 'underline',
      color: colors.main.errorRed,
    },
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  border: {
    border: '1px solid #eee',
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px',
  },
  subListContainer: {
    padding: 0,
    listStyleType: 'none',
    textDecoration: 'unset',
    [breakpoints.down('xs')]: {
      marginTop: '10px',
    },
  },
  footerLinksColumn: {
    flex: 1,
  },
}))

export default SiteMapHelp
