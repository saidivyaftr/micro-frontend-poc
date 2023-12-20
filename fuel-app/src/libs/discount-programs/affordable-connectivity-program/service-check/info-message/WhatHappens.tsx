import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'

const WhatHappens = () => {
  const classes = useStyles()
  const { whatHappensTitle, whatHappensSectionData } = useAppData(
    'WhatHappens',
    true,
  )

  return (
    <section className={classes.root}>
      <Typography tagType="h4" styleType="h4" className={classes.title}>
        {whatHappensTitle?.value}
      </Typography>
      <div className={classes.contentSection}>
        {whatHappensSectionData?.list?.map(
          (
            item: {
              whatHappensSubSectionTitle: any
              whatHappensSubSectionContent: any
            },
            index: any,
          ) => (
            <div className={classes.contentSectionBox} key={index}>
              <Typography
                tagType="h5"
                styleType="h5"
                className={classes.secondaryClass}
              >
                {item?.whatHappensSubSectionTitle?.value}
              </Typography>
              <Typography tagType="p" className={classes.contentStyle}>
                {item?.whatHappensSubSectionContent?.value}
              </Typography>
            </div>
          ),
        )}
      </div>
    </section>
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '0px auto 13.75rem auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0px  1rem 0px 1rem',
      margin: '0px 1rem 5.625rem 1rem',
    },
  },

  title: {
    letterSpacing: '-0.01em',
    paddingBottom: '3.5rem',
    borderBottom: `4px solid ${colors.main.brightRed}`,
  },

  contentStyle: {
    fontSize: '1.13rem',
    lineHeight: '1.5rem',
    paddingTop: '0.8rem',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },

  secondaryClass: {
    letterSpacing: '-0.01em',
  },
  contentSection: {
    display: 'flex',
    paddingTop: '3.5rem',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  contentSectionBox: {
    width: '28%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingBottom: '2rem',
    },
  },
}))

export default WhatHappens
