import { makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'

const QuickAccess = ({ data }: any) => {
  const styles = useStyles()
  if (!data || Object.keys(data || {}).length == 0) {
    return null
  }
  const { lists: quickLists, title } = data || {}

  const scrollToContent = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={styles.quickLinkWrapper}>
      <div className={styles.heading}>
        <InjectHTML
          addAnchorStyles
          tagType="p"
          styleType="p2"
          fontType="mediumFont"
          className={styles.title}
          value={title?.value}
        />
      </div>
      <ul className={styles.quickListContainer}>
        {quickLists?.links?.map((setting: any, index: number) => (
          <li key={index} className={styles.quickList}>
            <div
              className={styles.quickLink}
              onClick={() => scrollToContent(setting?.id?.value)}
            >
              {setting?.title?.value}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  quickLinkWrapper: {
    width: '100%',
    border: `1px solid ${colors.main.borderGrey}`,
    borderRadius: '16px',
  },
  heading: {
    background: colors.main.midnightExpress,
    padding: 32,
    borderRadius: '16px 16px 0px 0px',
  },
  title: {
    margin: 0,
    color: colors.main.blue,
  },
  quickListContainer: {
    margin: 0,
    padding: 0,
    '& li:last-child': {
      borderBottom: 'none',
    },
  },
  quickList: {
    listStyleType: 'none',
    padding: '1rem',
    paddingLeft: '2rem',
    borderBottom: `1px solid ${colors.main.borderGrey}`,
  },
  quickLink: {
    fontFamily: 'PP OBJECT SANS',
    fontSize: 18,
    cursor: 'pointer',
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
}))
export default QuickAccess
