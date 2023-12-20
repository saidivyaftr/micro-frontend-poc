import { makeStyles } from '@material-ui/core/styles'
import { CheckMarkRed } from '@/shared-ui/react-icons'
import { InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

const GigServiceCard = ({ data }: any) => {
  const classes = useStyles()
  const { title, description, legalNote, perks, key }: any = data || {}

  if (!data || Object.keys(data)?.length === 0) {
    return null
  }

  return (
    <div
      id={`${key}`}
      key={`${key}`}
      className={classes.card}
      data-testid="cards"
    >
      <div className={classes.cardTopContent}>
        <InjectHTML
          tagType="h3"
          styleType="h4"
          className={classes.cardTitle}
          value={title}
        />
        <InjectHTML
          tagType="p"
          styleType="p1"
          className={classes.description}
          value={description}
        />
        <InjectHTML
          tagType="p"
          className={classes.legalNote}
          styleType="legal"
          value={legalNote}
        />
        <div className={classes.perksContainer}>
          <ul>
            {perks?.map((perk: any, typeIndex: number) => (
              <li
                key={`card-${typeIndex}-perk-${typeIndex}`}
                data-testid={'perks'}
              >
                <div className={classes.checkIcon}>
                  <CheckMarkRed />
                </div>
                <InjectHTML
                  className={classes.perk}
                  tagType="span"
                  styleType="p2"
                  value={perk?.title?.value}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  cardTopContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTitle: {
    [breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },
  description: {
    margin: '16px 0px',
    fontFamily: 'PP Object Sans Bold',
    fontWeight: 700,
    '& sup': { lineHeight: 0 },
  },
  legalNote: { fontSize: '.75rem' },
  perksContainer: {
    width: '100%',
    '& ul': {
      padding: 0,
      listStyleType: 'none',
      minHeight: 120,
      [breakpoints.down('md')]: {
        minHeight: 150,
      },
      [breakpoints.down('sm')]: {
        minHeight: 'unset',
      },
    },
    '& li': {
      display: 'flex',
      marginBottom: 16,
    },
  },
  checkIcon: {
    minWidth: 25,
    '& svg': {
      height: 20,
      width: 25,
      marginRight: 8,
    },
  },
  perk: {
    '& sup': { lineHeight: 0 },
  },
  card: {
    backgroundColor: colors.main.white,
    boxShadow: `0px 0px 5px ${colors.main.boxShadow}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '38px',
    height: 'auto',
    maxWidth: 530,
    flex: 1,
    [breakpoints.down('xs')]: {
      maxWidth: 'unset',
      padding: '1.5rem',
    },
  },
}))

export default GigServiceCard
