import { makeStyles } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { CheckMarkRed } from '@/shared-ui/react-icons'
import { useAppData } from 'src/hooks'
import { useEffect } from 'react'

const CPNIThankYou = () => {
  const classes = useStyles()
  // eslint-disable-next-line no-unused-vars
  const { title, subtitle } = useAppData('thankYouCPNI', true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <Typography
          styleType="h3"
          className={classes.header}
          tagType="h4"
          fontType="regularFont"
        >
          {title?.value}
        </Typography>
        <div>
          <CheckMarkRed className={classes.icon} width={25} height={20} />
          <InjectHTML
            addAnchorStyles
            styleType="p1"
            value={subtitle?.value}
            className={classes.description}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    textAlign: 'left',
  },
  section: {
    paddingTop: '20px',
    textAlign: 'left',
  },
  header: {
    padding: '1rem 0',
    borderBottom: `1px solid ${colors.main.borderLightGray}`,
  },
  description: {
    paddingTop: '20px',
    paddingBottom: '40px',
    maxWidth: 'auto',
    margin: 'auto',
    marginLeft: '30px',
  },
  icon: {
    float: 'left',
    marginTop: '20px',
  },
}))

export default CPNIThankYou
