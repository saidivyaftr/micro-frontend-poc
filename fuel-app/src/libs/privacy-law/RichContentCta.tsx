import { makeStyles } from '@material-ui/styles'
import { RichText, Button } from '@/shared-ui/components'
import clx from 'classnames'
import { useAppData } from 'src/hooks'
declare const OneTrust: {
  ToggleInfoDisplay: () => any
}
const RichContent = () => {
  const {
    content,
    ctaText,
    id,
    class: btnClass,
  }: any = useAppData('richTextWithCta', true)
  const classes = useStyles({
    content: ctaText?.value,
  })
  if (!content) {
    return null
  }
  return (
    <div className={classes.root}>
      <div>
        <RichText
          wrapperClassName={classes.wrapper}
          data={{
            content: {
              value: content?.value,
            },
          }}
        />
        <Button
          id={id?.value}
          className={clx(classes.btn, btnClass?.value)}
          text={''}
          type="button"
          onClick={() => {
            OneTrust.ToggleInfoDisplay()
          }}
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }: any) => ({
  btn: {
    margin: '1rem',
    border: 'medium none white !important',
    padding: '12px 32px !important',
    fontSize: 0,
    [breakpoints.down('md')]: {
      width: 'fit-content',
    },
    [breakpoints.down('xs')]: {
      width: 'auto',
    },
    '&::before': {
      content: (props: any) => `"${props.content}"`,
      fontSize: '1.125rem',
    },
  },
  root: {
    margin: '0 auto 4rem auto',
    maxWidth: '1100px',
    [breakpoints.down('xs')]: {
      margin: '0 auto 2rem auto',
    },
  },
  wrapper: {
    paddingTop: '80px',
    maxWidth: '1100px',
    width: '100%',
    '& h2': {
      fontSize: 30,
      fontFamily: 'PP Object Sans Bold',
      marginBottom: 16,
    },
    '& h3': {
      fontSize: 18,
      fontFamily: 'PP Object Sans Bold',
      marginBottom: 16,
    },
    [breakpoints.down('xs')]: {
      width: 'auto',
      paddingTop: '40px',
    },
    '& p': {
      fontSize: 18,
      lineHeight: '26px',
      marginBottom: 32,
      fontFamily: 'PP Object Sans',
    },
    '& ul': {
      fontSize: 18,
      lineHeight: 26,
      fontFamily: 'PP Object Sans',
      marginBottom: 16,
      gap: 16,
      display: 'flex',
      padding: '0 !important',
      flexDirection: 'column',
      '& li': {
        padding: '0 0 0 2rem !important',
      },
    },
  },
}))

export default RichContent
