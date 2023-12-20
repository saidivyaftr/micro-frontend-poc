import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography, FourTiles, InjectHTML } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
import {
  COMPONENT_WRAPPER,
  HOMEPAGE_ID,
  HOMEPAGE_POPULAR_TOPICS,
} from 'src/constants'
const PopularHelp = () => {
  const classes = useStyles()
  const { title, tiles }: any = useAppData('popularHelp', true)

  const list = useMemo(() => {
    if (!tiles?.list) {
      return []
    }
    const tilesList = tiles?.list?.map((item: any, index: number) => ({
      title: item?.title?.value,
      description: item?.description?.value,
      icon: <InjectHTML value={item?.svgIcon?.rendered} />,
      href: item?.href?.url,
      objectID: `${HOMEPAGE_POPULAR_TOPICS[index]}${HOMEPAGE_ID}`,
    }))
    return tilesList
  }, [tiles])

  return (
    <div className={classes.root}>
      <Typography tagType="h2" styleType="h3" className={classes.title}>
        {title?.value}
      </Typography>
      <FourTiles
        type="dark"
        textAlign="left"
        tiles={list}
        mobileOneCol
        roundedBorders
        descriptionStyleType="p1"
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '48px 16px',
    [breakpoints.down('sm')]: {
      padding: 16,
    },
  },
  title: {
    textAlign: 'center',
    margin: '32px 0px',
    [breakpoints.down('xs')]: {
      padding: '0px 16px',
      fontSize: '1.5rem',
      lineHeight: '32px',
    },
  },
}))

export default PopularHelp
