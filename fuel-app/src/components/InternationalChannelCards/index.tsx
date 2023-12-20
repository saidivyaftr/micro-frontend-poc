import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import colors from 'src/styles/theme/colors'
import Link from 'next/link'
import { useAppData } from 'src/hooks'
import Image from 'next/image'

const InterChannelCards = () => {
  const classes = useStyles()
  const { cards } = useAppData('productCard', true)

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {cards?.targetItems?.map((card: any, index: number) => {
          return (
            <Grid item key={`card-${index}`} sm={6} md={4}>
              <div className={classes.card} data-testid="card">
                <div className={classes.cardImage}>
                  <Image
                    data-testid="cardImage"
                    src={card?.cardIconSrc?.value}
                    width={65}
                    height={65}
                    alt={card?.title?.value}
                  />
                </div>
                <Link href={card?.href?.url || ''}>
                  <a
                    data-testid="title"
                    className={classes.cardTitle}
                    href={card?.href?.url}
                    title={card?.title?.value}
                  >
                    <Typography
                      styleType="h5"
                      className={classes.cardTitleText}
                      fontType="regularFont"
                    >
                      {card?.title?.value}
                    </Typography>
                  </a>
                </Link>
                <Typography
                  data-testid="subTitle"
                  className={classes.cardSubTitle}
                >
                  {card?.subTitle?.value}
                </Typography>
                <Button
                  type="link"
                  href={card?.href?.url}
                  className={classes.learnMoreBtn}
                  text={card?.buttonText?.value}
                />
              </div>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1220,
    margin: '10px auto 30px',
    overflow: 'hidden',
    padding: '10px 25px 30px',
    '& .MuiGrid-item': {
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: '10px 16px',
      },
    },
  },
  card: {
    width: '100%',
    boxShadow: `2px 2px 2px 0 rgb(50 50 50 / 30%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 15px 20px',
    height: '100%',
    position: 'relative',
    border: `1px solid ${colors.main.gray}`,
    [theme.breakpoints.down('sm')]: {
      margin: '10px auto',
      minHeight: 200,
    },
  },
  cardImage: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 0 0',
      display: 'table',
    },
  },
  cardTitle: {
    textAlign: 'left',
    width: '100%',
    fontSize: '22px',
    lineHeight: '1.1',
    margin: '0 0 11px',
    fontWeight: 600,
    marginTop: 20,
    '&:hover': {
      textDecoration: 'underline',
      color: colors.main.primaryRed,
      textUnderlineOffset: '6px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
    },
  },
  cardTitleText: {
    '&:hover': {
      textDecoration: 'underline',
      color: colors.main.primaryRed,
      textUnderlineOffset: '6px',
    },
  },
  cardSubTitle: {
    margin: '10px auto 20px',
    fontSize: 14,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  learnMoreBtn: {
    margin: 'auto 0 0',
  },
}))

export default InterChannelCards
