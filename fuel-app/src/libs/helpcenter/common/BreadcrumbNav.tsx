import { useMemo } from 'react'
import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import { Breadcrumb } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'
import { getBreadcrumbRoutes } from 'src/utils/helpCenter'
import colors from '@/shared-ui/colors'

type IBreadcrumbNav = {
  url: string
  variant?: 'primary' | 'secondary'
  className?: string
}

const BreadcrumbNav = ({
  url = '',
  variant = 'primary',
  className,
}: IBreadcrumbNav) => {
  const classes = useStyles()
  const breadcrumb = useAppData('breadcrumb', true)
  const routes = useMemo(() => {
    return breadcrumb?.path?.targetItems?.map(
      ({ href, pageName }: any, index: number) => ({
        pageName: pageName?.value,
        href: href?.url,
        isCurrent:
          index === breadcrumb?.path?.targetItems?.length - 1 ||
          href?.url === '',
      }),
    )
  }, [breadcrumb])

  return (
    <div className={clx(classes.root, className)} data-testid="BlogArticles">
      <Breadcrumb
        variant={variant}
        links={routes || getBreadcrumbRoutes(url)}
        hoverEffect
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '16px auto 80px auto',
    '& a': {
      '&:hover': {
        color: `${colors.main.brightRed} !important`,
      },
    },
  },
}))

export default BreadcrumbNav
