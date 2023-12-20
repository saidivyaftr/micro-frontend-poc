import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
const BillPayment = () => {
  const classes = useStyles()
  const { title, tiles } = useAppData('billPayment', true)

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = tiles?.list?.map((item: any) => ({
      title: item?.title?.value,
      description: item?.description?.value,
      icon: (
        <InjectHTML className={classes.icon} value={item?.svgIcon?.value} />
      ),
      href: item?.href?.url,
    }))
    return tilesList
  }, [tiles])

  if (!tiles?.list.length) return null

  return (
    <div className={classes.root} data-testid="billPayment">
      {title?.value && (
        <Typography
          tagType="h3"
          styleType="h3"
          className={classes.title}
          data-testid="billPayment-title"
        >
          {title?.value}
        </Typography>
      )}
      <FourTiles
        type="light"
        textAlign="left"
        tiles={list}
        mobileOneCol
        titleClassName={classes.tileTitle}
        titleStyleType="h4"
        descriptionStyleType="p1"
        tilesWrapperClassName={classes.tilesWrapper}
        cardClassName={classes.tile}
        isClickable={false}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '0px 16px 64px 16px',
    [breakpoints.down('sm')]: {
      padding: 16,
    },
  },
  title: {
    textAlign: 'center',
    margin: '2rem 0',
    [breakpoints.down('xs')]: {
      padding: '0px 16px',
      margin: '1rem 0',
    },
  },
  tileTitle: {
    [breakpoints.down('xs')]: {
      fontSize: '1.25rem',
    },
  },
  tilesWrapper: {
    gap: '2rem',
    [breakpoints.down('xs')]: {
      gap: '1rem',
    },
  },
  tile: {
    padding: '2rem',
  },
  icon: {
    [breakpoints.down('xs')]: {
      '& svg': {
        height: 30,
        width: 30,
      },
    },
  },
}))

export default BillPayment
