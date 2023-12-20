import { makeStyles } from '@material-ui/core'

const FormIframe = () => {
  const DOTCOM_URL = process.env.DOTCOM_URL || ''
  const iframe_src = `${DOTCOM_URL}/forms/accessibility-form`
  const classes = useStyles()
  return (
    <iframe
      className={classes.root}
      src={iframe_src}
      title="Contact"
      width="100%"
      height="650px"
    />
  )
}

const useStyles = makeStyles(() => ({
  root: {
    border: '0',
  },
}))
export default FormIframe
