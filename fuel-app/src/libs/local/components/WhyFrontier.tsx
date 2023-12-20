import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Tile } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

const WhyFrontier = (data: any) => {
  const classes = useStyles()
  const { tiles }: any = data?.data || {}

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
          styleType: 'h4',
          className: classes.tileTitle,
        },
        description: {
          value: item?.description?.value,
          styleType: 'p1',
          tagType: 'p',
        },
        links: [
          {
            href: item?.linkUrl?.url,
            text: {
              children: item?.linkText?.value,
              styleType: 'p1',
              tagType: 'span',
              href: item?.linkUrl?.url,
            },
            className: classes.titleLink,
          },
        ],
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  if (!data || Object.keys(list)?.length === 0) {
    return null
  }
  return (
    <div className={classes.root} id="why-frontier">
      <div className={classes.wrapper}>
        {list.map((tile, i) => (
          <Tile
            key={i}
            title={tile?.title}
            description={tile?.description}
            links={tile?.links}
            className={classes.tile}
            descriptionClassName={classes.description}
          />
        ))}
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: colors.main.white,
  },
  wrapper: {
    maxWidth: 1146,
    margin: 'auto',
    padding: '5rem  7.5rem',
    boxSizing: 'content-box',
    display: 'flex',
    gap: '3rem',
    [breakpoints.down('sm')]: {
      padding: '48px 16px',
      flexDirection: 'column',
    },
  },
  tile: {
    flex: 1,
    padding: 0,
    alignContent: 'space-between',
    flexDirection: 'column',
    display: 'flex',
    '& p span': {
      display: 'unset',
      [breakpoints.down('xs')]: {
        fontSize: '16px',
        lineHeight: '1.5rem',
      },
    },
    '& p': { flex: 1, marginBottom: '1.5rem' },
  },
  description: {
    '& a': {
      minWidth: 'unset',
      textDecoration: 'underline',
      fontFamily: 'PP OBJECT SANS MEDIUM',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
  tileTitle: {
    maxWidth: 260,
    paddingBottom: '1rem',
    [breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  titleLink: {
    marginRight: 'auto',
    paddingTop: '1rem',
    textDecoration: 'none',
    '& span': {
      fontFamily: 'PP OBJECT SANS BOLD',
      textDecoration: 'underline',
      '&:hover': {
        color: colors.main.brightRed,
      },
    },
  },
}))

export default WhyFrontier
