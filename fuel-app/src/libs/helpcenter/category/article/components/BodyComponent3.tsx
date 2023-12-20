import clx from 'classnames'
import { makeStyles } from '@material-ui/core'
import { InjectHTML, Button } from '@/shared-ui/components'
import { ListWrapper } from './helper'

const BodyComponent3 = ({ data }: any) => {
  const styles = useStyles()
  if (Object.keys(data || {}).length == 0) {
    return null
  }
  const {
    id,
    title,
    description,
    listtype,
    lists,
    buttonText,
    backgroundColor,
    buttonVariant,
    buttonURL,
    legalText,
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
          tagType="h2"
          styleType="h4"
          className={styles.title}
          value={title?.value}
        />
      )}
      {description?.value && (
        <InjectHTML
          addAnchorStyles
          tagType="p"
          styleType="p1"
          value={description?.value as string}
        />
      )}
      <ListWrapper type={listtype?.value}>
        {lists?.list?.map((list: any, index: number) => {
          return (
            <li
              className={styles.lists}
              key={list?.text?.value + 'key' + index}
            >
              <InjectHTML
                addAnchorStyles
                tagType="p"
                data-testid="answer"
                styleType="p1"
                value={list?.text?.value as string}
              />
            </li>
          )
        })}
      </ListWrapper>
      {buttonText?.value && (
        <Button
          type="link"
          text={buttonText?.value}
          className={styles.button}
          href={buttonURL?.url}
          variant={buttonVariant?.targetItem?.buttonType?.value || 'tertiary'}
        />
      )}
      {legalText?.value && (
        <InjectHTML
          addAnchorStyles
          data-testid="legalText"
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
  lists: {
    '& p': {
      marginBottom: 16,
    },
  },
  button: {
    margin: '32px 0px',
    display: 'flex',
    width: 'max-content',
    fontSize: 18,
    [breakpoints.down('xs')]: {
      width: '100%',
      margin: '16px 0px',
      display: 'block',
    },
  },
}))

export default BodyComponent3
