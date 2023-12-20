import {
  Hero,
  HelpCenterFAQ,
  QuickLinks,
  SupportArticles,
  BlogArticles,
  Videos,
} from './index'
import { BreadcrumbNav, FindWhatYouNeed } from '../common'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core'
import { PP_OBJECT_SANS_BOLD } from 'src/constants/fontFamilyNames'
import { useDispatch } from 'react-redux'
import { fetchQuickLinks } from 'src/redux/slicers/quickLinksSlice'
import { useEffect } from 'react'

const PageWrapper: React.FC<{ page: string }> = ({ page }) => {
  const dispatch = useDispatch()
  const { pathname } = useRouter() || {}
  const styles = useStyles()

  useEffect(() => {
    if (dispatch) {
      dispatch(fetchQuickLinks())
    }
  }, [dispatch])

  return (
    <div className={styles.root}>
      <Hero page={page} />
      {page && (
        <BreadcrumbNav url={pathname} className={styles.breadcrumbNav} />
      )}
      <QuickLinks />
      <div className={styles.faqContainer}>
        <HelpCenterFAQ />
      </div>
      <SupportArticles />
      <Videos />
      {!page && <BlogArticles />}
      <FindWhatYouNeed />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    '& sup': {
      fontSize: '60%',
    },
  },
  faqContainer: {
    '& ul, ol': {
      paddingLeft: 24,
    },
    '& li': {
      '&::marker': {
        fontFamily: PP_OBJECT_SANS_BOLD,
      },
      marginBottom: '1rem',
      paddingLeft: 8,
      [breakpoints.down('xs')]: {
        paddingLeft: 4,
        marginBottom: '0.5rem',
      },
    },
  },
  breadcrumbNav: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))

export default PageWrapper
