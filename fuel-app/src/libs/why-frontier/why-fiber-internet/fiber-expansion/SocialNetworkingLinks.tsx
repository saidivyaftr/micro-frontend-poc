import React from 'react'
import { Typography } from '@/shared-ui/components'
import { FacebookBGA, LinkedInBGA, TwitterBGA } from '@/shared-ui/react-icons'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const SocialNetworkingLinks = () => {
  const classes = useStyles()
  const { followUsText, socialMediaLinks } = useAppData(
    'socialNetworkingLinks',
    true,
  )
  const getIcon = (name: string) => {
    switch (name) {
      case 'Twitter':
        return <TwitterBGA />
      case 'Facebook':
        return <FacebookBGA />
      case 'LinkedIn':
        return <LinkedInBGA />
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.socialNetworkContainer}>
        <Typography testId="test-mainlink-category" tagType="h4" styleType="h4">
          {followUsText?.value}
        </Typography>
        <div>
          {socialMediaLinks && (
            <ul className={classes.socialMediaLinks}>
              {socialMediaLinks?.list?.map(
                ({ name, href, title }: any, index: any) => {
                  return (
                    <li key={`social-media-${index}`}>
                      <a
                        href={href?.value}
                        title={title?.value}
                        className={classes.socialMediaLink}
                      >
                        {getIcon(name?.value)}
                      </a>
                    </li>
                  )
                },
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }: { breakpoints: any }) => ({
  root: {
    backgroundColor: colors.main.greenishBlue,
  },
  socialNetworkContainer: {
    padding: '30px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    [breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  socialMediaLinks: {
    margin: '0',
    padding: '0',
    listStyleType: 'none',
    textDecoration: 'unset',
    display: 'flex',
    gap: '8px',
  },
  socialMediaLink: {
    '& svg': {
      height: 40,
      width: 40,
    },
  },
}))
export default SocialNetworkingLinks
