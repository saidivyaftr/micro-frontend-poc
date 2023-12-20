import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import useAppData from '@/shared-ui/hooks/useAppData'
const WithDirectv = () => {
  const classes = useStyles()
  const { mainTitle, title, description, img, directv } = useAppData(
    'withDirectv',
    true,
  )
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Typography styleType="h5" tagType="h2" className={classes.title}>
          {mainTitle?.value}
        </Typography>
        <Typography className={classes.description}>
          {description?.value}
        </Typography>
        <img className={classes.img} src={img.src} alt={img.alt} />
        <Typography tagType="h2" styleType="h5" className={classes.mainTitle}>
          {title?.value}
        </Typography>
        <div className={classes.cards}>
          {directv?.list?.map((item: any, key: number) => {
            return (
              <div key={key} className={classes.card}>
                <img
                  className={classes.cardImg}
                  src={item?.image?.src}
                  alt={item?.image?.alt}
                />
                <InjectHTML
                  value={item?.description?.value}
                  className={classes.cardDescription}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainTitle: {
    margin: '60px auto',
    fontSize: '22px',
  },
  title: {
    margin: '60px auto 0 auto',
    fontSize: '22px',
  },
  description: {
    textAlign: 'center',
    margin: '0 auto 60px auto',
    maxWidth: '640px',
  },
  img: {
    margin: '0 auto 30px auto',
    maxWidth: '350px',
    [breakpoints.down('xs')]: {
      maxWidth: '90%',
    },
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
    maxWidth: 1170,
    width: '100%',
    [breakpoints.down('xs')]: {
      gridTemplateColumns: '100%',
    },
  },
  card: {
    maxWidth: '250px',
    margin: 'auto',
  },
  cardImg: {
    display: 'block',
    width: '100%',
    maxWidth: '120px',
    margin: 'auto',
  },
  cardDescription: {
    marginTop: 20,
    textAlign: 'center',
  },
}))

export default WithDirectv
