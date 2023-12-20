import { makeStyles } from '@material-ui/core'
import { WarningIcon } from '@/shared-ui/react-icons'
import { Typography, Button } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'

const ActionModal = (props: any) => {
  const classes = useStyles()
  const { title, subTitle, info, info1, btn1, btn2, supportInfo, supportLink } =
    props.data

  return (
    <div className={classes.root}>
      <div className={classes.warningIcon}>
        <WarningIcon />
      </div>
      <div className={classes.warningMessage}>
        <Typography tagType="h3" styleType="h6">
          {title?.value}
        </Typography>
        <Typography tagType="h3" styleType="h6">
          {subTitle?.value}
        </Typography>
      </div>
      <div className={classes.warningMessage}>
        {info?.value && (
          <Typography tagType="p" styleType="p2">
            {info?.value}
          </Typography>
        )}
        {info1?.value && (
          <Typography tagType="p" styleType="p2">
            {info1?.value}
          </Typography>
        )}
      </div>
      <div className={classes.btnWrapper}>
        <Button
          type="button"
          text={btn1?.text?.value}
          className={classes.btnStyle}
          onClick={props.btn1Handler}
        />
        {btn2?.text?.value && (
          <Button
            type="button"
            variant="secondary"
            text={btn2?.text?.value}
            className={classes.btnStyle}
            onClick={props.btn2Handler}
          />
        )}
      </div>
      {(supportInfo?.value || supportLink?.value) && (
        <p className={classes.textCenter}>
          <Typography styleType="p3" tagType="span" fontType="mediumFont">
            {supportInfo?.value}
          </Typography>
          <Button
            type="link"
            variant="lite"
            hoverVariant="primary"
            className={classes.updateLinkBtn}
            text={supportLink?.value}
          />
        </p>
      )}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '40px 0',
  },
  warningIcon: {
    width: 100,
    margin: '0 auto',
  },
  warningMessage: {
    margin: '20px 48px',
    textAlign: 'center',
  },
  btnWrapper: {
    width: 246,
    margin: '0 auto',
  },
  btnStyle: {
    marginTop: 20,
    fontSize: '14px',
    padding: '0',
  },
  textCenter: {
    textAlign: 'center',
  },
  updateLinkBtn: {
    marginLeft: '10px',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 14,
  },
}))

export default ActionModal
