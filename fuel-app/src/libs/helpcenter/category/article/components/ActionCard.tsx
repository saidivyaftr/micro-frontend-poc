import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import clx from 'classnames'

const ActionCard = ({ data }: any) => {
  const styles = useStyles()
  if (!data || Object.keys(data || {}).length == 0) {
    return null
  }
  const {
    title,
    description,
    buttonText,
    buttonURL,
    buttonVariant,
    caption,
    backgroundColor,
    icon,
    id,
  } = data || {}

  return (
    <div
      className={clx(styles.root, {
        [styles.cardPadding]:
          backgroundColor?.targetItem?.backgroundColorHexCode?.value,
      })}
      id={id?.value}
      style={{
        backgroundColor:
          backgroundColor?.targetItem?.backgroundColorHexCode?.value,
      }}
    >
      {icon?.value && (
        <InjectHTML
          addAnchorStyles
          value={icon?.value}
          className={styles.cardIcon}
        />
      )}
      {title?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="h2"
          styleType="h4"
          value={title?.value}
        />
      )}
      {description?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="p"
          styleType="p1"
          value={description?.value}
        />
      )}
      {buttonText?.value && (
        <Button
          type="link"
          className={styles.signUpButton}
          variant={buttonVariant?.targetItem?.buttonType?.value}
          text={buttonText?.value}
          href={buttonURL?.url}
        />
      )}
      {caption?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="p"
          styleType="p3"
          data-testid="caption"
          className={styles.caption}
          value={caption?.value as string}
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
    },
  },
  cardPadding: {
    padding: 32,
    [breakpoints.down('sm')]: {
      padding: 16,
    },
  },
  signUpButton: {
    display: 'flex',
    maxWidth: 'max-content',
    marginTop: 32,
    fontSize: 18,
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
      marginTop: 16,
      display: 'block',
    },
  },
  caption: {
    marginTop: 32,
    [breakpoints.down('xs')]: {
      marginTop: 16,
    },
  },
  cardIcon: {
    marginBottom: 12,
  },
}))

export default ActionCard
