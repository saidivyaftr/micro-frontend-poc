import { ButtonWithChatLink, InjectHTML } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const HelpPage = () => {
  const { title, customerChat, customerChatLinkText, chatLinkDescription } =
    useAppData('helpPage', true)
  const classes = useStyles()

  return (
    <div id="internet-credit" className={classes.root}>
      <div className={classes.container}>
        <div>
          {title?.value && (
            <InjectHTML tagType="h2" styleType="h4" value={title?.value} />
          )}
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.paragraph}>
            <ButtonWithChatLink
              labelLinkText={customerChatLinkText?.value}
              labelName={`${customerChat?.value} `}
              labelNameColor="black"
              labelStyleType="p1"
              labelTagType="div"
              buttonTarget="_blank"
              labelLinkTextColor="black"
              hoverVariant="secondary"
            />
            <InjectHTML
              tagType="p"
              styleType="p1"
              value={` ${chatLinkDescription?.value}`}
              className={classes.desc}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: { backgroundColor: colors.main.greenishBlue },
  container: {
    maxWidth: 1232,
    padding: '1rem',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    paddingTop: `${typography.pxToRem(80)}`,
    paddingBottom: `${typography.pxToRem(80)}`,
    justifyContent: 'center',
    [breakpoints.down('sm')]: {
      display: 'block',
      flexDirection: 'column',
      paddingTop: '3rem',
      paddingBottom: '3rem',
    },
  },
  rightContainer: {
    marginLeft: `${typography.pxToRem(48)}`,
    [breakpoints.down('sm')]: {
      marginTop: '1rem',
      marginLeft: '0',
    },
  },
  paragraph: {
    alignItems: 'baseline',
    margin: 0,
    '&  div': {
      display: 'inline  !important',
    },
    '& > div > a': {
      display: 'none',
    },
    '& > div button': { padding: 0 },
  },
  desc: {
    display: 'inline',
  },
}))
