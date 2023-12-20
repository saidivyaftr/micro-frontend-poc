/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER, SITE_INTERACTION } from 'src/constants'
import { useAppData } from '../../hooks'
import DTMClient from 'src/utils/adobe/dynamicTagManagement/client'

const SiteMap = () => {
  const { links, heading } = useAppData('SiteMap', true)
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
        <Typography fontType="regularFont" className={classes.mainHeading}>
          {heading?.value}
        </Typography>
        <hr className={classes.border} />
        <div className={classes.linksContainer}>
          {links?.map(({ title, children }: any, index: number) => {
            return (
              <div
                key={`sitemap-column-${index}`}
                className={classes.linksColumn}
              >
                <Typography
                  testId="test-mainlink-category"
                  tagType="h2"
                  styleType="p2"
                  fontType="boldFont"
                  className={classes.heading}
                >
                  {title.value}
                </Typography>
                <ul className={classes.subListContainer}>
                  {children?.map(({ title, href }: any) => {
                    return (
                      <li key={`footer-column-${index}-${title.value}`}>
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
    fontSize: '36px',
  },
  contentWrapper: {
    marginBottom: '20px',
    paddingTop: '40px',
  },
  heading: {
    margin: '10px 0',
  },
  title: {
    '&:hover': {
      textDecoration: 'underline',
      color: colors.main.brightRed,
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
  linksColumn: {
    flex: 1,
  },
}))

export default SiteMap
