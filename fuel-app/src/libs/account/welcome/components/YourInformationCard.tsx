/* eslint-disable @typescript-eslint/indent */
import { makeStyles } from '@material-ui/core'
import { Typography } from '@/shared-ui/components'
import { useProfileData } from 'src/selector-hooks'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import useAppData from '@/shared-ui/hooks/useAppData'

const YourInformationCard = () => {
  const classes = useStyles()
  const { title, email } = useAppData('YourInformation', true) || {}
  const profileData = useProfileData()
  return (
    <CardWithTitle className={classes.cardContainer}>
      <>
        <Typography tagType="h3" styleType="h5">
          {title?.value}
        </Typography>
        <div className={classes.contentBlock}>
          <Typography styleType="h6" className={classes.contentLeft}>
            {email?.value}
          </Typography>
          <Typography
            styleType="h6"
            fontType="regularFont"
            className={classes.contentRight}
          >
            {profileData?.email}
          </Typography>
        </div>
      </>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '3rem 1rem',
    gap: '1rem',
    [breakpoints.up('xs')]: {
      padding: '2rem 1rem',
      gap: '1rem',
    },
    [breakpoints.up('md')]: {
      padding: '3rem',
    },
    [breakpoints.up('lg')]: {
      padding: '3rem 1rem',
    },
  },
  contentBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    [breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    [breakpoints.up('lg')]: {
      flexDirection: 'column',
    },
  },
  contentLeft: {
    [breakpoints.up('md')]: {
      flex: '0 0 224px',
    },
    [breakpoints.up('lg')]: {
      flex: 'unset',
    },
  },
  contentRight: {
    wordBreak: 'break-word',
    [breakpoints.up('xs')]: {
      flex: '1 1',
    },
    [breakpoints.up('md')]: {
      flex: 'unset',
    },
  },
}))

export default YourInformationCard
