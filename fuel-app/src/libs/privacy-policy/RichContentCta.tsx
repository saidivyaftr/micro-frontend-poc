import { makeStyles } from '@material-ui/styles'
import { InjectHTML, Button } from '@/shared-ui/components'
import { useAppData } from 'src/hooks'
declare const OneTrust: {
  ToggleInfoDisplay: () => any
}
const RichContent = () => {
  const classes = useStyles()
  const { content, ctaText } = useAppData('richTextWithCta', true)
  if (!content) {
    return null
  }
  return (
    <div className={classes.wrapper}>
      <InjectHTML
        addAnchorStyles
        fontType="regularFont"
        value={content?.value}
      />
      <Button
        className={classes.btn}
        text={ctaText.value}
        type="button"
        onClick={() => {
          OneTrust.ToggleInfoDisplay()
        }}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }: any) => ({
  btn: {
    [breakpoints.down('md')]: {
      width: 'fit-content',
    },
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  wrapper: {
    maxWidth: '1072px',
    margin: 'auto',
    padding: '2.5rem 16px',
  },
}))

export default RichContent
