import { makeStyles } from '@material-ui/core'
import { Typography, InjectHTML } from '@/shared-ui/components'
import { Grid } from '@material-ui/core'
import { useMemo } from 'react'
import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { COMPONENT_WRAPPER } from 'src/constants'

const WhyFiber = () => {
  const classes = useStyles()
  const { title, infos } = useAppData('whyFiber', true)
  const lists = useMemo(() => {
    if (!infos?.targetItems) {
      return []
    }
    const infoList = []
    for (const item of infos?.targetItems) {
      const payload: any = {
        title: item?.title?.value,
        description: item?.description?.value,
        readMore: item?.readMore,
      }
      infoList.push(payload)
    }
    return infoList
  }, [infos])
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <InjectHTML
          tagType="h2"
          styleType="h3"
          className={classes.title}
          value={title?.value}
        />
        <Grid container spacing={4}>
          <Grid item sm={12} className={classes.borderWrapper}>
            <hr />
          </Grid>
          {lists.map((info: any, index: number) => (
            <Grid
              item
              sm={12}
              md={4}
              key={index}
              className={classes.cardWrapper}
            >
              <InjectHTML
                tagType="h5"
                styleType="h5"
                className={classes.subTitle}
                value={info?.title}
              />
              <InjectHTML
                tagType="div"
                styleType="p2"
                value={info?.description}
              />
              <a
                className={classes.button}
                type="link"
                href={`${info?.readMore?.link}`}
                target="_blank"
                rel="noreferrer"
              >
                <Typography>{info?.readMore?.label}</Typography>
              </a>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    padding: 0,
  },
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: '5rem 0 1rem 5rem',
    [breakpoints.down('sm')]: {
      padding: '2.5rem 1rem',
    },
  },
  title: {
    textAlign: 'center',
    margin: '16px 0px',
  },
  cardWrapper: {
    width: '95%',
    [breakpoints.down('md')]: {
      width: '90%',
      margin: '0 auto',
    },
  },
  borderWrapper: {
    width: '100%',
    '& hr': {
      backgroundColor: colors.main.brightRed,
      marginBottom: 30,
      border: 0,
      height: 4,
    },
  },
  subTitle: {
    marginBottom: 16,
    fontWeight: 700,
  },

  button: {
    margin: '16px 0px',
    textDecoration: 'underline',
    fontSize: 16,
    fontWeight: 500,
    display: 'inline-block',
    '&:hover': {
      color: colors.main.brightRed,
      '& div': {
        color: colors.main.brightRed,
      },
    },
  },
}))

export default WhyFiber
