import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML, Tile } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

const BundleYourServices = (data: any) => {
  const classes = useStyles()
  const { title, subTitle, tiles }: any = data?.data || {}

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
            type: 'link',
            variant: 'tertiary',
          },
        ],
      }
      tilesList.push(payload)
    }
    return tilesList
  }, [tiles])

  if (!title || !subTitle || !tiles) {
    return null
  }

  return (
    <div className={classes.root} data-testid="bundle-your-services">
      <div className={classes.wrapper}>
        <div className={classes.titleSection}>
          <Typography tagType="h3" styleType="h3" color="secondary">
            {title?.value}
          </Typography>
          <InjectHTML
            className={classes.paragraph}
            styleType="p1"
            tagType="p"
            color="tertiary"
            value={subTitle?.value as string}
          />
        </div>
        <div className={classes.tiles}>
          {list.map((tile, i) => (
            <Tile
              key={i}
              backgroundColor="gray"
              title={tile?.title}
              description={tile?.description}
              ctas={tile?.ctas}
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
    maxWidth: 1200,
    margin: 'auto',
    padding: '5rem  7.5rem',
    boxSizing: 'content-box',
    [breakpoints.down('lg')]: {
      padding: '5rem  4rem',
    },
    [breakpoints.down('sm')]: {
      padding: '3rem 1rem',
    },
  },
  titleSection: {
    display: 'flex',
    gap: '1.25rem',
    marginBottom: '3rem',
    [breakpoints.down('sm')]: {
      gap: '1rem',
      flexDirection: 'column',
    },
    '& p': {
      margin: 0,
    },
  },
  paragraph: {
    flexBasis: '678px',
    marginTop: 0,
    [breakpoints.down('sm')]: {
      flexBasis: 'auto',
    },
  },
  tiles: {
    display: 'flex',
    gap: '1.25rem',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& > div': {
        padding: '2rem',
      },
    },
    '& p': {
      marginBottom: 0,
    },
    '& div:last-child': {
      [breakpoints.down('sm')]: {
        marginTop: '2rem',
      },
    },
  },
}))

export default BundleYourServices
