import { Button, InjectHTML, Typography } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import { useAppData } from 'src/hooks'
import { useMyServicesContext } from '../../MyServicesContextProvider'
import colors from '@/shared-ui/colors'

const ExploreAddons = ({
  onClickCTA,
  tabTitle,
}: {
  onClickCTA: any
  tabTitle: string
}) => {
  const classes = useStyles()
  const { setSelectedTab } = useMyServicesContext()
  const ExploreAddons = useAppData('ExploreAddons', true)
  const getAddons = () => {
    onClickCTA(`${tabTitle}:${ExploreAddons?.buttonText?.value}`)
    setSelectedTab(1)
  }
  return (
    <div className={classes.tileClass}>
      <InjectHTML styleType={'p1'} value={ExploreAddons.iconUpgrade.value} />

      <Typography tagType="div" styleType="h5" className={classes.description}>
        {ExploreAddons.description.value}
      </Typography>
      <div className={classes.buttonDiv}>
        <Button
          type="link"
          variant="secondary"
          text={ExploreAddons?.buttonText?.value}
          className={classes.buttonClassName}
          hoverVariant="primary"
          onClick={getAddons}
        />
      </div>
    </div>
  )
}

export default ExploreAddons

const useStyles = makeStyles(({ breakpoints }) => ({
  disableTile: {
    color: `${colors.main.gray} !important`,
  },
  container: {
    position: 'relative',
    padding: 0,
  },
  tileClass: {
    width: '100%',
  },
  descriptionClassName: {
    '& li': { padding: 8 },
  },

  addonsTitle: {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 14,
    marginBottom: 4,
  },
  description: { margin: '32px 0px 32px 0px' },
  buttonClassName: {
    marginTop: 16,
  },
  buttonDiv: {
    display: 'flex',
    [breakpoints.up('lg')]: {
      display: 'inline-block',
    },
  },
  buttonEmptyDiv: {
    display: 'inline-block',
    padding: 16,
    [breakpoints.up('lg')]: {
      display: 'inline-block',
      padding: 16,
    },
  },
}))
