import { makeStyles } from '@material-ui/core'
import { Button, Typography } from 'src/blitz'
import useAppData from '@/shared-ui/hooks/useAppData'
import { Dispatch } from 'react'
import { AppRoutes } from 'src/constants'

interface YouAreAllSetPageProps {
  setShowBackBtn: Dispatch<boolean>
  currentState: string
}

const YouAreAllSetPage = ({
  setShowBackBtn,
  currentState,
}: YouAreAllSetPageProps) => {
  const classes = useStyles()

  const { title, description, emailDescription, goToMyAccountCta } =
    useAppData('youAllSet', true) || {}
  setShowBackBtn(false)

  return (
    <div className={classes.youAllSetContainer}>
      <Typography tagType={'h3'} styleType="h5">
        {title?.value}
      </Typography>
      <Typography tagType="p" styleType="p2" className={classes.description}>
        {currentState === 'YOU_ALL_SET_PAGE'
          ? description?.value
          : emailDescription?.value}
      </Typography>
      <Button
        type="link"
        variant="primary"
        text={goToMyAccountCta?.value}
        href={AppRoutes.AccountDashboard}
        hoverVariant="primary"
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  youAllSetContainer: {
    width: '100%',
    textAlign: 'center',
    [breakpoints.up('sm')]: {
      width: 484,
    },
  },
  description: {
    margin: '16px auto',
    width: 200,
    [breakpoints.up('sm')]: {
      margin: '32px',
      width: 'auto',
    },
  },
}))

export default YouAreAllSetPage
