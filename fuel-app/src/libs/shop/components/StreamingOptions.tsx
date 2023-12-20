import { Button, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'
import { COMPONENT_WRAPPER } from 'src/constants'
import { IShopComponents } from './types'

const StreamingOptions = ({ styles }: IShopComponents) => {
  const classes = useStyles()
  const data = useAppData('streamingOptions', true)
  const { buttonText, buttonUrl, title, description, options } = data
  if (!title?.value) {
    return null
  }

  return (
    <div id="streaming-options" className={classes.root} style={styles}>
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          {title?.value && (
            <InjectHTML
              tagType="h2"
              styleType="h3"
              fontType="boldFont"
              value={title?.value}
              color="secondary"
            />
          )}
        </div>
        <div className={classes.rightContainer}>
          {description?.value && (
            <InjectHTML
              tagType="h3"
              styleType="h5"
              value={description?.value}
              color="tertiary"
              fontType="boldFont"
              className={classes.description}
            />
          )}
          {options?.targetItems.length &&
            options?.targetItems.map((option: any) => (
              <div
                key={`${option?.key.value}_${option?.value.value}`}
                className={classes.optionContainer}
              >
                <InjectHTML
                  tagType="div"
                  styleType="h6"
                  value={option?.key.value}
                  color="tertiary"
                  className={classes.optionKey}
                />
                <InjectHTML
                  tagType="p"
                  styleType="p1"
                  value={option?.value.value}
                  color="tertiary"
                />
              </div>
            ))}
          <Button
            type="link"
            hoverVariant="secondary"
            href={buttonUrl?.url}
            text={buttonText?.value}
            className={classes.btnLearn}
          />
        </div>
      </div>
    </div>
  )
}

export default StreamingOptions

const useStyles = makeStyles(({ breakpoints }) => ({
  root: { backgroundColor: colors.main.dark },
  container: {
    ...COMPONENT_WRAPPER,
    display: 'flex',
    padding: '5rem 1rem',
    [breakpoints.down('sm')]: {
      padding: '2.5rem 1rem',
      flexDirection: 'column',
    },
  },
  leftContainer: {
    flex: 1,
    width: '100%',
    [breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  rightContainer: {
    flex: 1.5,
    display: 'flex',
    flexDirection: 'column',
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
    },
  },
  optionKey: {
    marginRight: '0.5rem',
  },
  description: {
    marginBottom: '2rem',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  optionContainer: {
    display: 'inline-flex',
    marginBottom: '.5rem',
  },
  btnLearn: {
    marginTop: '1.5rem',
  },
}))
