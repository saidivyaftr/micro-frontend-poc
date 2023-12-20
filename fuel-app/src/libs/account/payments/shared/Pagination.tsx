import colors from '@/shared-ui/colors'
import { makeStyles } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from 'src/blitz/assets/react-icons'
import clsx from 'classnames'
import { Typography } from '@/shared-ui/components'
const Pagination = ({
  totalPayments,
  paymentsPerPage,
  currentPage,
  paginate,
}: any) => {
  const classes = useStyles()
  const pageNumbers = []
  const pages = Math.ceil(totalPayments / paymentsPerPage)
  const showNext = currentPage !== pages
  const showPrev = currentPage !== 1
  for (let i = 1; i <= pages; i++) {
    const isCurrent = currentPage === i
    if (i <= 3 || i === pages) {
      pageNumbers.push(
        <button
          className={clsx(classes.navBtn, classes.pageItem, {
            [classes.currentItem]: isCurrent,
          })}
          key={i}
          onClick={() => paginate(i)}
        >
          <Typography styleType="p1">{i.toString()}</Typography>
        </button>,
      )
    } else if (i === 4) {
      pageNumbers.push(
        <Typography key={i} className={clsx(classes.pageItem)} styleType="p1">
          ...
        </Typography>,
      )
    }
  }

  return (
    <div className={classes.root}>
      <nav aria-label="Page navigation example">
        <div className={classes.pageItems}>
          {showPrev && (
            <button
              className={classes.navBtn}
              onClick={() => paginate(currentPage - 1)}
            >
              <ChevronLeft />
            </button>
          )}
          {pageNumbers}
          {showNext && (
            <button
              className={classes.navBtn}
              onClick={() => paginate(currentPage + 1)}
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}
const useStyles = makeStyles(() => ({
  root: {
    padding: '2rem 2rem 0rem',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'flex-end',
  },
  currentItem: {
    borderBottom: `2px solid ${colors.main.brightRed} !important`,
  },
  pageItems: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
  },
  pageItem: {
    width: 22,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  navBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    '& svg': {
      width: 20,
      height: 20,
    },
  },
}))

export default Pagination
