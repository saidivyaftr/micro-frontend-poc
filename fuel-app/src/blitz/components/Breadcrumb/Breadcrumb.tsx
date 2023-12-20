import { Typography } from '@/shared-ui/components'
import { ChevronRight } from '@/shared-ui/react-icons'
import clx from 'classnames'
import { IBreadcrumb } from './types'
import css from './Breadcrumb.module.scss'
import getFrontierBaseUrl from 'src/utils/api/baseUrl'
import { Button } from '@/shared-ui/components'

const Breadcrumb = ({
  variant = 'primary',
  links,
  hoverEffect = false,
  breadCrumbClassName,
}: IBreadcrumb) => {
  const replaceBaseUrl = (urlString: string) => {
    return urlString.replace('{baseUrl}', `${getFrontierBaseUrl()}`)
  }
  return (
    <div data-testid="breadcrumb" className={css.container}>
      {links?.map(
        ({ pageName, href, isCurrent, useHistory = false }, index) => {
          return (
            <span
              key={`breadcrumb-${pageName}`}
              className={clx(css.navElement, {
                [css.secondaryNavLink]: variant === 'secondary',
              })}
            >
              {isCurrent ? (
                <Typography
                  color={variant === 'primary' ? 'default' : 'tertiary'}
                  className={
                    pageName?.toLocaleLowerCase() === 'eero secure'
                      ? ''
                      : clx(css.linkText, breadCrumbClassName)
                  }
                >
                  {pageName}
                </Typography>
              ) : (
                <>
                  {useHistory ? (
                    <>
                      <Button
                        type="button"
                        variant="lite"
                        text={pageName}
                        onClick={() => {
                          window.history.back()
                        }}
                        className={css.ButtonColor}
                      ></Button>
                    </>
                  ) : (
                    <a
                      href={replaceBaseUrl(href)}
                      className={clx({
                        [css.hoverEffect]: hoverEffect,
                      })}
                    >
                      <Typography
                        className={clx(
                          css.linkText,
                          'active-link',
                          breadCrumbClassName,
                          {
                            [css.hoverEffect]: hoverEffect,
                          },
                        )}
                        fontType="mediumFont"
                        color={variant === 'primary' ? 'default' : 'tertiary'}
                      >
                        {pageName}
                      </Typography>
                    </a>
                  )}
                </>
              )}
              {links?.length !== index + 1 && <ChevronRight />}
            </span>
          )
        },
      )}
    </div>
  )
}

export default Breadcrumb
