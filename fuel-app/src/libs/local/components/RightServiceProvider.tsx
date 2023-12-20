import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML, Tile } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

const RightServiceProvider = ({ data }: any) => {
  const classes = useStyles()
  const { title, subtitle, tiles }: any = data || {}

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
        },
        description: {
          value: item?.description?.value,
          styleType: 'p1',
          tagType: 'p',
        },
        ctas: [
          {
            href: item?.ctaUrl?.url,
            label: item?.ctaLabel?.value,
            variant: 'tertiary',
            type: 'link',
            className: `${classes.button}`,
          },
        ],
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.titleSection}>
          <Typography tagType="h2" styleType="h3" color="secondary">
            {title?.value}
          </Typography>
          <InjectHTML
            className={classes.paragraph}
            styleType="p1"
            tagType="p"
            color="tertiary"
            value={subtitle?.value as string}
          />
        </div>
        <div className={classes.tiles}>
          {list.map((tile, i) => (
            <div data-testid="tile" key={i}>
              <Tile
                key={i}
                backgroundColor="gray"
                title={tile?.title}
                description={tile?.description}
                ctas={tile?.ctas}
                className={classes.tileWrapper}
                descriptionClassName={classes.description}
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
    background: colors.main.dark,
  },
  wrapper: {
    maxWidth: 1200,
    margin: 'auto',
    padding: '5rem  7.5rem',
    boxSizing: 'content-box',
    [breakpoints.down('lg')]: {
      padding: '5rem  4rem',
    },
    [breakpoints.down('sm')]: {
      padding: '3rem 0',
    },
  },
  titleSection: {
    display: 'flex',
    gap: '1.25rem',
    marginBottom: '3rem',
    [breakpoints.down('sm')]: {
      gap: '1rem',
      flexDirection: 'column',
      padding: '0 1em',
    },
    '& p': {
      margin: 0,
    },
  },
  description: {
    display: 'inline !important',
    '& a': {
      textDecoration: 'underline',
      fontFamily: 'PP OBJECT SANS MEDIUM',
      '&:hover': {
        color: `${colors.main.brightRed} !important`,
      },
    },
  },
  paragraph: {
    flexBasis: '678px',
    marginTop: 0,
    [breakpoints.down('sm')]: {
      flexBasis: 'auto',
      fontSize: '1rem',
    },
  },
  tiles: {
    display: 'flex',
    gap: '1.25rem',
    '& > div': {
      flex: 1,
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > div': {
        padding: '0 1rem .5rem',
      },
    },
    '& h3': {
      [breakpoints.down('sm')]: {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
      },
    },
    '& p': {
      marginBottom: 0,
      [breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
      },
    },
    '& div:last-child': {
      [breakpoints.down('sm')]: {
        marginTop: '.5em',
      },
    },
  },
  button: {
    border: 'none',
    textDecoration: 'underline',
    textAlign: 'left',
    padding: '0',
    textTransform: 'none',
    fontSize: '18px',
    minHeight: 'unset',
    '&:hover': {
      backgroundColor: 'initial !important',
      color: 'initial !important',
    },
  },
  tileWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    '& > div': {
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
      alignSelf: 'unset',
    },
  },
}))

export default RightServiceProvider
