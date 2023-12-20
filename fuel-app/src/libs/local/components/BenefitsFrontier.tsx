import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Tile, InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'

const BenefitsFrontier = (data: any) => {
  const classes = useStyles()
  const { title, tiles }: any = data?.data || {}

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = []
    for (const item of tiles?.list) {
      const payload: any = {
        title: {
          children: item?.title?.value,
          tagType: 'h3',
          styleType: 'h5',
        },
        description: {
          value: item?.description?.value,
          styleType: 'p1',
          tagType: 'p',
          className: classes.tiledescription,
        },
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div id="benefits-frontier" className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.titleSection}>
          <InjectHTML
            className={classes.header}
            styleType="h3"
            tagType="h2"
            value={title?.value}
            color="secondary"
          />
        </div>
        <div className={classes.tiles}>
          {list.map((tile, i) => (
            <Tile
              key={`${tile?.title?.children}-${i}`}
              backgroundColor="white"
              title={tile?.title}
              description={tile?.description}
              ctas={tile?.ctas}
              className={classes.tile}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.dark,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '5rem 1rem',
    [breakpoints.down('sm')]: {
      padding: '2.5rem 1rem',
    },
  },
  header: {
    [breakpoints.down('sm')]: {
      '& br': {
        display: 'none',
      },
    },
  },
  titleSection: {
    marginBottom: '5rem',
    maxWidth: '1100px',
    [breakpoints.down('sm')]: {
      marginBottom: '3rem',
    },
  },
  tiles: {
    display: 'flex',
    gap: '1rem',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    '& a': {
      textDecoration: 'underline',
      fontFamily: 'PP OBJECT SANS MEDIUM',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
    '& h3': {
      minHeight: '4rem',
      marginBottom: '1.25rem',
      [breakpoints.down('sm')]: {
        minHeight: 'auto',
        fontSize: '1.125rem',
        marginBottom: '1rem',
      },
    },
  },
  tile: {
    padding: '2rem',
    borderRadius: '16px',
    flex: 1,
    display: 'unset',
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem',
    },
    '& p': {
      marginBottom: 0,
    },
  },
  tiledescription: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
}))

export default BenefitsFrontier
