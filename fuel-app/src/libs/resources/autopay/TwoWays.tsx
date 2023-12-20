import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML, RichText } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
const TwoWays = () => {
  const classes = useStyles()

  const data = useAppData('twoWays', true)
  const { title, tiles }: any = data

  if (!tiles?.list.length) return null

  return (
    <div id="apply-acp" className={classes.root} data-testid="two-ways">
      <div className={classes.wrapper}>
        {title?.value && (
          <Typography
            tagType="h3"
            styleType="h3"
            className={classes.title}
            data-testid="two-ways-title"
          >
            {title?.value}
          </Typography>
        )}
        <div className={classes.tilesWrapper}>
          {tiles?.list?.map((item: any, i: number) => (
            <div
              className={classes.tile}
              key={`keys-${i}`}
              data-testid="two-ways-tile"
            >
              <InjectHTML className={classes.icon} value={item?.icon?.value} />
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
    background: colors.main.white,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    paddingBottom: 60,
    paddingTop: 60,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
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
    backgroundColor: colors.main.grey,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '2rem 2rem 3rem 2rem',
    borderRadius: '2rem',
    [breakpoints.down('xs')]: {
      width: '100%',
      borderRadius: '1rem',
      paddingBottom: '0rem',
    },
  },

  icon: {
    [breakpoints.down('xs')]: {
      '& svg': {
        height: 30,
        width: 30,
      },
    },
  },
  content: {
    padding: '2rem 0 0',
    '& li': {
      padding: '0 0 0.5rem 0.5rem',
    },
    '& ol': {
      paddingLeft: '1.25rem !important',
    },
    '& b': {
      fontFamily: 'PP Object Sans Bold',
    },
    '& a': {
      textDecoration: 'underline',
      fontFamily: 'PP Object Sans Medium',
      display: 'inline',
      '&:hover': { color: colors.main.brightRed },
    },
    [breakpoints.down('xs')]: {
      padding: '1rem 0 0',
      '& li': {
        fontSize: '1rem',
      },
      '& h4': {
        fontSize: '1.125rem',
      },
      '& ol': {
        paddingLeft: '1rem !important',
      },
    },
  },
}))

export default TwoWays
