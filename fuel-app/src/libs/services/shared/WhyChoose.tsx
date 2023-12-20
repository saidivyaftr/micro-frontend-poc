import { Typography, FourTiles, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core/styles'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import { IFourTileItem } from '@/shared-ui/components/FourTiles/types'

export type tileType = {
  description?: string
  href?: string
  icon?: JSX.Element
  title?: string
  subTitle?: string
}

export type tileList = {
  tile: tileType
}[]

// The Background color will be coming from SiteCore
let componentBackgroundColor = colors.main.brightRed

const WhyChoose = () => {
  const { title, subTitle, tileList, backgroundColor } = useAppData(
    'whychooseProductTiles',
    true,
  )
  componentBackgroundColor = backgroundColor?.color.field?.value
  const classes = useStyles(backgroundColor)
  const list: IFourTileItem[] = tileList?.list.map((tile: any) => {
    return {
      title: tile?.title?.value,
      description: tile?.description?.value,
      icon: <InjectHTML value={tile.icon.value} />,
    }
  })

  return (
    <div id="special-about-fiber" className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.container} id="more">
          <Typography tagType="h3" styleType="h3" className={classes.title}>
            {title?.value}
          </Typography>
          <Typography tagType="h5" styleType="h5" className={classes.title}>
            {subTitle?.value}
          </Typography>
          <div className={classes.tileArea}>
            <FourTiles
              mobileOneCol
              textAlign="left"
              tiles={list}
              type="light"
              roundedBorders={true}
              titleStyleType="h6"
              descriptionStyleType="p1"
              isClickable={false}
              cardClassName={classes.cardClass}
              iconClassName={classes.tileIcon}
              titleClassName={classes.tileTitle}
              descriptionClassName={classes.tileDescription}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    background: componentBackgroundColor,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '60px 1rem',
    [breakpoints.down('sm')]: {
      padding: '40px 1rem',
    },
  },
  container: {
    paddingTop: 40,
    paddingBottom: 32,
    position: 'relative',
    [breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  title: {
    marginBottom: 16,
    color: colors.main.white,
    textAlign: 'center',
  },
  tileArea: {
    marginTop: 64,
  },
  tileIcon: {
    [breakpoints.down('sm')]: {
      margin: 'auto',
      '& svg': {
        height: 28,
        width: 28,
      },
    },
  },
  cardClass: {
    width: 378,
    [breakpoints.down('md')]: {
      width: 'auto',
    },
    [breakpoints.down('xs')]: {
      width: 'auto',
      textAlign: 'center',
    },
  },
  tileTitle: {
    marginTop: 32,
    marginBottom: 32,
    [breakpoints.down('sm')]: {
      marginTop: 10,
      marginBottom: 8,
    },
  },
  tileDescription: {
    [breakpoints.down('sm')]: {
      margin: 0,
    },
  },
}))

export default WhyChoose
