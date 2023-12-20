import { makeStyles } from '@material-ui/core'
import { useAppData } from 'src/hooks'
import { Breadcrumb } from 'src/blitz'
import { formatUrl } from 'src/utils/urlHelpers'

const BreadcrumbNav = () => {
  const classes = useStyles()
  const { path } = useAppData('breadcrumb', true)

  let breadcrumbData = []
  if (path) {
    const { targetItems } = path
    breadcrumbData = targetItems.map((r: any, index: number) => {
      return {
        href: formatUrl(r.href.url),
        pageName: r.pageName.value,
        isCurrent: index === targetItems?.length - 1,
      }
    })
  }

  return (
    <div className={classes.BreadcrumbNav}>
      {breadcrumbData && (
        <Breadcrumb variant="secondary" links={breadcrumbData} />
      )}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  BreadcrumbNav: {
    position: 'relative',
    top: '20px',
  },
}))

export default BreadcrumbNav
