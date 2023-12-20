//import Picture from '../Picture'
import Picture from 'src/blitz/components/Picture'
import { TwoColumnLayoutProps } from 'src/blitz/components/TwoColumnLayout/types'
import css from 'src/blitz/components/TwoColumnLayout/TwoColumnLayout.module.scss'
import clx from 'classnames'

const TwoColumnLayout = ({
  image,
  webpImage,
  title,
  content,
  reverse,
  mobileReverse,
  className = '',
  gridClassName = '',
  imageWrapperClassName = '',
  innerWrapperClassName = '',
  roundedBorders = false,
  testId = '',
  mobileImage = '',
  mobileWebpImage = '',
  tabletImage = '',
  tabletWebpImage = '',
  gridItemClassName = '',
  gridItemImageClassName = '',
  imageClassName = '',
}: TwoColumnLayoutProps) => {
  return (
    <>
      <div className={clx(css.root, className)}>
        <div
          className={clx(css.innerWrapper, innerWrapperClassName, {
            [css.roundedBorders]: roundedBorders,
          })}
        >
          <div
            className={`${
              css.gridContainer
            } ${gridClassName} ${getMobileOrientation(
              css,
              mobileReverse,
            )} ${getOrientation(css, reverse)}`}
          >
            <div
              className={clx(
                `${css.gridItem} gridItemContent`,
                gridItemClassName,
              )}
            >
              {content}
            </div>
            {image && (
              <div
                className={clx(
                  `${css.gridItem} gridItemImage`,
                  gridItemImageClassName,
                )}
              >
                <div className={clx(css.root, imageWrapperClassName)}>
                  <Picture
                    testId={testId}
                    desktop={{
                      image: image,
                      webp: webpImage,
                    }}
                    mobile={{
                      image: mobileImage,
                      webp: mobileWebpImage,
                    }}
                    tablet={{
                      image: tabletImage,
                      webp: tabletWebpImage,
                    }}
                    className={clx(css.image, imageClassName)}
                    altText={title}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function getOrientation(css: any, reverse?: boolean): string {
  return reverse ? css.reverse : ''
}
function getMobileOrientation(css: any, mobileReverse?: boolean): string {
  return mobileReverse ? css.mobileReverse : ''
}
export default TwoColumnLayout
