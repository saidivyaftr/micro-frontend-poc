import { makeStyles } from '@material-ui/core'
import { Button, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import clx from 'classnames'

const AffectedArea = (data: any) => {
  const classes = useStyles()
  const { affectedAreas, noDataText, headingTitle }: any = data?.data

  if (!affectedAreas?.targetItems?.length) {
    return (
      <div
        id="affected-area"
        className={classes.noChannlesWrapper}
        data-testid="AffectedArea-local"
      >
        <Typography
          tagType="h2"
          styleType="h3"
          className={classes.noChannlesTitle}
        >
          {noDataText?.value}
        </Typography>
      </div>
    )
  }

  return (
    <div
      id="affected-area"
      className={classes.wrapper}
      data-testid="AffectedArea-local"
    >
      <Typography tagType="h2" styleType="h3" className={classes.headingTitle}>
        {headingTitle?.value}
      </Typography>
      <div className={classes.list}>
        {affectedAreas?.targetItems?.map((item: any, index: number) => {
          return (
            <div
              className={clx(classes.listItem, {
                [classes.listWith2Items]:
                  affectedAreas.targetItems.length === 2,
                [classes.listWith3Items]:
                  affectedAreas.targetItems.length === 3,
                [classes.listWith1Item]: affectedAreas.targetItems.length === 1,
              })}
              key={index}
            >
              <Typography
                tagType="h3"
                styleType="h3"
                className={classes.cardTitle}
              >
                {item?.areaTitle?.value}
              </Typography>
              <Typography
                tagType="p"
                styleType="p2"
                className={classes.cardDescription}
              >
                {item?.areaDescription?.value}
              </Typography>
              <div>
                <Button
                  text={item?.btnText?.value}
                  type="link"
                  triggerEvent={true}
                  href={item?.btnLink?.value}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
const useStyles = makeStyles(({ breakpoints }: { breakpoints: any }) => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  listItem: {
    background: colors.main.grey,
    padding: '2rem',
    borderRadius: '32px',
    width: 'calc(25% - 1rem)',
    marginBottom: '2rem',
    [breakpoints.down('sm')]: {
      width: '100%',
      padding: '2rem',
      margin: '1rem 0 0 0',
    },
    '&:first-child': {
      marginLeft: 0,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  listWith2Items: {
    width: 'calc(50% - 1rem)',
  },
  listWith3Items: {
    width: 'calc(33.33% - 1rem)',
  },
  listWith1Item: {
    width: '100%',
  },
  cardTitle: {
    fontSize: '30px',
    lineHeight: '38px',
    [breakpoints.down('xs')]: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    },
  },
  cardDescription: {
    fontSize: '18px',
    lineHeight: '26px',
    margin: '16px 0',
  },
  wrapper: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '80px 40px 1rem 40px',
    [breakpoints.down('sm')]: {
      padding: '40px 1rem',
    },
  },
  noChannlesWrapper: {
    background: colors.main.blue,
    textAlign: 'center',
    padding: '40px 1rem',
    [breakpoints.down('xs')]: {
      padding: '2rem 1rem',
    },
  },
  noChannlesTitle: {
    fontSize: '30px',
    lineHeight: '38px',
    fontWeight: 700,
    [breakpoints.down('xs')]: {
      fontSize: '20px',
      lineHeight: '28px',
    },
  },
  headingTitle: {
    fontSize: '42px',
    lineHeight: '50px',
    textAlign: 'center',
    marginBottom: '2rem',
    [breakpoints.down('xs')]: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
      maxWidth: '230px',
      margin: '0 auto 1rem auto',
    },
  },
}))

export default AffectedArea
