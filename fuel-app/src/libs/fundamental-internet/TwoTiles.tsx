import { makeStyles } from '@material-ui/core'
import { Typography, RichText } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import { HomeWifiIcon, WifiIcon } from '@/shared-ui/react-icons/index'
const TwoTiles = () => {
  const classes = useStyles()

  const data = useAppData('twoTiles', true)
  const { title, tiles }: any = data

  if (!tiles?.list.length) return null

  return (
    <div
      id="fundamental-internet-twoTiles"
      className={classes.root}
      data-testid="two-tiles"
    >
      <div className={classes.wrapper}>
        {title?.value && (
          <Typography
            tagType="h3"
            styleType="h3"
            className={classes.title}
            data-testid="two-tiles-title"
          >
            {title?.value}
          </Typography>
        )}
        <div className={classes.tilesWrapper}>
          {tiles?.list?.map((item: any, i: number) => (
            <div
              className={classes.tile}
              key={`keys-${i}`}
              data-testid="two-tiles-tile"
            >
              {item?.icon?.value?.field?.value === 'Wifi' && (
                <WifiIcon
                  className={classes.icon}
                  color={colors.main.brightRed}
                />
              )}
              {item?.icon?.value?.field?.value === 'HomeWifi' && (
                <HomeWifiIcon
                  className={classes.icon}
                  color={colors.main.brightRed}
                />
              )}
              <RichText
                wrapperClassName={classes.content}
                data={{
                  content: {
                    value: item?.content.value,
                  },
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.grey,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '80px 16px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      paddingTop: '40px',
    },
  },
  title: {
    marginBottom: '2rem',
  },

  tilesWrapper: {
    maxWidth: '100%',
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },

  tile: {
    backgroundColor: colors.main.white,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '2rem 2rem 2rem 2rem',
    borderRadius: '1rem',
    [breakpoints.down('xs')]: {
      width: '100%',
      borderRadius: '1rem',
      paddingBottom: '0rem',
    },
  },

  icon: {
    height: 40,
    width: 'auto',
    [breakpoints.down('xs')]: {
      height: 20,
    },
  },
  content: {
    padding: '2rem 0 0',
    '& h3': {
      fontWeight: '400',
      marginTop: '1rem',
    },
    [breakpoints.down('xs')]: {
      padding: '1rem 0 0',
    },
  },
}))

export default TwoTiles
