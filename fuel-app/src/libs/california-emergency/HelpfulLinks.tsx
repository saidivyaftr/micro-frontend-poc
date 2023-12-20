import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@/shared-ui/components'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const HelpfulLinks: React.FC = () => {
  const classes = useStyles()()
  const { title, helpfulTextUrlsCol1, helpfulTextUrlsCol2 } = useAppData(
    'helpfulLinks',
    true,
  )
  return (
    <div className={classes.root} id="helpfulLinks">
      <div className={classes.content}>
        {title?.value && (
          <Typography
            tagType="div"
            styleType="h4"
            fontType="regularFont"
            color="default"
            className={classes.heading}
          >
            {title.value}
          </Typography>
        )}
        <div className={classes.wrapper}>
          <div className={classes.mainContent}>
            {helpfulTextUrlsCol1?.targetItems.map((item: any, i: number) => {
              return (
                <Button
                  variant="lite"
                  hoverVariant={'primary'}
                  type="link"
                  href={item.link.url}
                  className={classes.btn}
                  text={item.link.text}
                  key={i}
                />
              )
            })}
          </div>
          <div className={classes.mainContent}>
            {helpfulTextUrlsCol2?.targetItems.map((item: any, i: number) => {
              return (
                <Button
                  variant="lite"
                  hoverVariant={'primary'}
                  type="link"
                  href={item.link.url}
                  className={classes.btn}
                  text={item.link.text}
                  key={i}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = () =>
  makeStyles(({ breakpoints }) => ({
    root: {
      padding: '0rem 1rem',
    },
    content: {
      marginTop: '3rem',
      margin: '0 auto',
      width: '90%',
      [breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      [breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    heading: {
      padding: '70px 0px 35px',
      textAlign: 'center',
      [breakpoints.down('xs')]: {
        fontSize: '30px',
      },
    },
    mainContent: {
      margin: '0 0 10px',
    },
    btn: {
      margin: '0 0 16px 25px',
      fontSize: '18px',
      color: colors.main.black,
      display: 'block',
      textDecoration: 'underline',
      '&:hover': {
        color: colors.main.torchRed,
      },
    },
  }))

export default HelpfulLinks
