/* eslint-disable @typescript-eslint/indent */
import clx from 'classnames'
import { InjectHTML, Button } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'

const BodyComponent1 = ({ data }: any) => {
  const styles = useStyles()
  if (!data || Object.keys(data || {}).length == 0) {
    return null
  }
  const {
    title,
    description,
    sectionImages,
    buttonText,
    buttonURL,
    buttonVariant,
    backgroundColor,
    richText,
    legalText,
    id,
  } = data || {}

  return (
    <div
      className={clx(styles.root, {
        [styles.cardPadding]:
          backgroundColor?.targetItem?.backgroundColorHexCode?.value,
      })}
      style={{
        backgroundColor:
          backgroundColor?.targetItem?.backgroundColorHexCode?.value,
      }}
      id={id?.value}
    >
      {title?.value && (
        <InjectHTML
          addAnchorStyles
          tagType={title?.type || 'h2'}
          styleType={title?.type || 'h4'}
          className={styles.title}
          value={title?.value}
        />
      )}
      {description?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="p"
          styleType="p1"
          className={styles.description}
          value={description?.value as string}
        />
      )}
      {Array.isArray(sectionImages?.list) && sectionImages?.list?.length > 0 && (
        <div className={styles.imageContainer}>
          {sectionImages?.list?.map((item: any, index: number) => {
            return (
              <div
                key={`section-image-${index}`}
                className={styles.imageHandle}
              >
                {item.title && (
                  <InjectHTML
                    addAnchorStyles
                    tagType="h5"
                    styleType="h5"
                    className={styles.imageTitle}
                    value={item?.title?.value}
                  />
                )}
                {item?.value?.src && (
                  <img
                    className={styles.image}
                    src={item?.value?.src}
                    alt={item?.value?.alt}
                    loading="lazy"
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
      {buttonText?.value && (
        <Button
          type="link"
          text={buttonText?.value}
          className={styles.button}
          href={buttonURL?.url}
          variant={buttonVariant?.targetItem?.buttonType?.value || 'tertiary'}
        />
      )}
      {richText?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="p"
          styleType="p1"
          value={richText?.value as string}
        />
      )}
      {legalText?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="p"
          styleType="p3"
          value={legalText?.value as string}
        />
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    marginBottom: 80,
    borderRadius: 32,
    [breakpoints.down('sm')]: {
      marginBottom: 32,
      padding: 0,
    },
  },
  cardPadding: {
    padding: '32px',
    [breakpoints.down('xs')]: {
      padding: '32px 16px',
    },
  },
  title: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
  },
  imageTitle: {
    marginBottom: 16,
    fontSize: 18,
    lineHeight: '20px',
    [breakpoints.down('xs')]: {
      marginBottom: 8,
    },
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 32,
    [breakpoints.down('md')]: {
      maxHeight: 500,
      objectFit: 'contain',
    },
  },
  button: {
    display: 'flex',
    width: 'max-content',
    fontSize: 18,
    [breakpoints.down('xs')]: {
      width: '100%',
      display: 'block',
    },
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 32,
    marginTop: 32,
    gap: 16,
    alignItems: 'flex-start',
    [breakpoints.down('sm')]: {
      marginBottom: 16,
      flexDirection: 'column',
      width: '100%',
    },
  },
  imageHandle: {
    width: '100%',
    height: 'auto',
    borderRadius: 32,
  },
}))

export default BodyComponent1
