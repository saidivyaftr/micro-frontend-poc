import { makeStyles } from '@material-ui/core'
import { ArrowLink, Card, InjectHTML, Typography } from 'src/blitz'
import colors from 'src/styles/theme/colors'
// import { useAppData } from 'src/hooks'
import { MySupport as mySupportMock } from './mockData'

const MySupport = () => {
  const classes = useStyles()
  const mySupportData = mySupportMock
  if (Object.keys(mySupportData)?.length === 0) {
    return null
  }

  const { title, cards, links } = mySupportData

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Typography styleType="h6" className={classes.header}>
          {title.value}
        </Typography>
        <div className={classes.cardsGrid}>
          {cards.map((item) => (
            <Card
              key={item.contentLabel.value}
              backgroundColor="light-gray"
              className={classes.card}
              size="square"
            >
              <>
                <InjectHTML addAnchorStyles value={item.icon} />
                <Typography styleType="p2">
                  {item.contentLabel.value}
                </Typography>
                <ArrowLink
                  wrapperClassName={classes.arrowClass}
                  styleType="p3"
                  fontType="boldFont"
                  label={item.linkLabel.value}
                  url={item.href.url}
                  hoverColor="primary"
                />
              </>
            </Card>
          ))}
          <div className={classes.links}>
            {links.map((link) => (
              <div className={classes.link} key={link.linkLabel.value}>
                <ArrowLink
                  icon={link.icon}
                  label={link.linkLabel.value}
                  url={link.href.url}
                  styleType="p2"
                  fontType="boldFont"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    padding: '4rem 0 0 0',
  },
  container: {
    background: colors.main.white,
    borderRadius: '1rem',
    padding: '2rem',
    [breakpoints.down('xs')]: {
      padding: '1rem',
    },
  },
  header: {
    margin: '1rem auto',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr) 18.75rem',
    gap: '1rem',
    [breakpoints.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
  card: {
    '&:hover': {
      cursor: 'pointer',
      transition: '0.3s all',
      boxShadow: '0px 0px 16px rgba(20, 25, 40, 0.15)',
      '& $arrowClass': {
        color: colors.main.brightRed,
      },
    },
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  links: {
    display: 'grid',
    rowGap: '1rem',
  },
  link: {
    background: colors.main.secondaryLight,
    borderRadius: '1rem',
    padding: '1.5rem 2rem',
    '&:hover': {
      cursor: 'pointer',
      transition: '0.3s all',
      boxShadow: '0px 0px 16px rgba(20, 25, 40, 0.15)',
    },
  },
  arrowClass: {},
}))

export default MySupport
