import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import { Breadcrumb } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'

type IBreadcrumbNav = {
  data?: any
}

const BreadcrumbNav = ({ data }: IBreadcrumbNav) => {
  const classes = useStyles()
  const breadcrumb = { ...data }

  const routes = useMemo(() => {
    return breadcrumb?.path?.targetItems?.map(
      ({ href, pageName }: any, index: number) => ({
        pageName: pageName?.value,
        href: href?.url,
        isCurrent: index === breadcrumb?.path?.targetItems?.length - 1,
      }),
    )
  }, [breadcrumb])
  if (Object.keys(data)?.length === 0) {
    return null
  }
  return (
    <div className={clx(classes.root)} data-testid="Breadcrumb-nav">
      <Breadcrumb
        variant="primary"
        links={routes}
        hoverEffect
        breadCrumbClassName={classes.breadCrumbStyles}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '16px auto 52px auto',
  },
  breadCrumbStyles: {
    fontSize: 18,
    lineHeight: '26px',
  },
}))

export default BreadcrumbNav
