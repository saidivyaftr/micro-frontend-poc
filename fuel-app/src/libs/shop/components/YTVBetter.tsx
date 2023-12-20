import { makeStyles } from '@material-ui/core'
import { Typography, TwoColumnLayout } from '@/shared-ui/components'
import { CheckMarkBlackRound } from '@/shared-ui/react-icons'
import useAppData from '@/shared-ui/hooks/useAppData'
import { IShopComponents } from './types'

const YTVBetter = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const data = useAppData('YTVBetter', true)
  const { title, description, listData, image } = data

  if (!title?.value || !description?.value) {
    return null
  }

  return (
    <div id="ytv-better" className={classes.root} style={styles}>
      <TwoColumnLayout
        image={image?.src}
        title={title?.value}
        imageClassName={classes.imageWrapper}
        gridClassName={classes.gridContainer}
        gridItemImageClassName={classes.gridItemImage}
        innerWrapperClassName={classes.innerWrapper}
        content={
          <div className={classes.nonImageContainer}>
            <Typography tagType="h2" styleType="h3" color="default">
              {title?.value}
            </Typography>
            <Typography tagType="p" styleType="p1" color="default">
              {description?.value}
            </Typography>
            <Typography tagType="p" styleType="p1" color="default">
              <ul className={classes.list}>
                {listData?.targetItems?.map((item: any) => (
                  <li
                    className={classes.listItem}
                    key={`${item?.value?.value}_key`}
                  >
                    <span className={classes.icon}>
                      <CheckMarkBlackRound />
                    </span>
                    {item?.value?.value}
                  </li>
                ))}
              </ul>
            </Typography>
          </div>
        }
        mobileReverse
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: '80px 0px',
    [breakpoints.down('sm')]: {
      padding: '40px 0px 0px',
      margin: '0 1rem',
    },
    '& img': {
      borderRadius: '2rem',
    },
  },
  gridItemImage: {
    flexBasis: '55%',
    maxWidth: '52%',
    [breakpoints.down('md')]: {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  imageWrapper: {
    objectFit: 'fill',
    [breakpoints.down('xs')]: {
      objectFit: 'cover',
    },
  },
  gridContainer: {
    flexWrap: 'unset',
  },
  innerWrapper: {
    [breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    marginBottom: '1rem',
  },
  icon: {
    marginRight: '0.5rem',
  },
  nonImageContainer: {
    padding: '0 2rem',
    [breakpoints.down('sm')]: {
      padding: '2rem 1rem 0 1rem',
    },
  },
}))
export default YTVBetter
