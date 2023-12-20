import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { Typography } from '@/shared-ui/components'
import { PADDING } from 'src/constants'
import { Pdf } from '@/shared-ui/react-icons'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const Information: React.FC = () => {
  const classes = useStyles()()
  const { title, pdfUrls } = useAppData('information', true)
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.information}>
          {title?.value && (
            <Typography
              tagType="div"
              styleType="h4"
              fontType="regularFont"
              className={classes.heading}
            >
              {title.value}
            </Typography>
          )}

          <div className={classes.iconButton}>
            {pdfUrls?.targetItems?.map((item: any, index: number) => {
              {
                return (
                  <Link href={item?.url} key={index}>
                    <a target={'_blank'}>
                      <div className={classes.iconWithButton}>
                        <Pdf width={'30px'} height={'30px'} />
                        <Typography
                          fontType="boldFont"
                          tagType="h5"
                          styleType="h5"
                          className={classes.text}
                        >
                          {item?.value}
                        </Typography>
                      </div>
                    </a>
                  </Link>
                )
              }
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
      padding: '0rem',
      background: colors.main.grey,
    },
    content: {
      padding: '2rem 1rem',
      margin: '0 auto',
      width: '90%',
      [breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    information: {
      marginBottom: '2rem',
      padding: `0px ${PADDING}px`,
      [breakpoints.down('sm')]: {
        padding: `0px`,
      },
    },
    heading: {
      textAlign: 'center',
      marginBottom: '30px',
      [breakpoints.down('sm')]: {
        fontSize: '30px',
      },
    },
    iconButton: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      [breakpoints.down('sm')]: {
        flexDirection: 'column',
        flexWrap: 'no-wrap',
      },
    },
    iconWithButton: {
      margin: '12px 0px',
      padding: '0px 20px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: '30px',
      marginLeft: '1rem',
      '&:hover': {
        fill: colors.main.torchRed,
        '& $text': {
          color: colors.main.torchRed,
        },
      },
      [breakpoints.down('sm')]: {
        padding: '0px 5px',
      },
    },
    text: {
      marginLeft: '0.5rem',
      [breakpoints.down('sm')]: {
        fontSize: '20px',
      },
    },
  }))

export default Information
