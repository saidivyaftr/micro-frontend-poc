import { makeStyles } from '@material-ui/core'
import { Card, InjectHTML, Typography } from 'src/blitz'
import colors from 'src/styles/theme/colors'
import { RightArrowIcon } from 'src/blitz/assets/react-icons'

type value = {
  value: string
}

type url = {
  url: string
}

export type PromotionalCardProps = {
  icon: value
  title: value
  labelLink: value
  url: url
  disableLink: boolean
  enrollPaperless: any
}

const PromotionalCard = ({
  title,
  labelLink,
  url,
  icon,
  disableLink = false,
  enrollPaperless,
}: PromotionalCardProps) => {
  const styles = useStyles()
  const getCardContent = () => {
    return (
      <>
        <InjectHTML
          addAnchorStyles
          className={styles.icon}
          value={icon?.value}
        />
        <Typography color="secondary" styleType="h6" className={styles.title}>
          {title?.value}
        </Typography>

        <div className={styles.arrowClass}>
          <Typography styleType="p2" color="tertiary" fontType="boldFont">
            {labelLink?.value}
          </Typography>
          <RightArrowIcon width="20.91" height="14.08" color="white" />
        </div>
      </>
    )
  }

  return (
    <Card size="square" className={styles.component}>
      {disableLink ? (
        <div className={styles.wrapper} onClick={enrollPaperless}>
          {getCardContent()}
        </div>
      ) : (
        <a href={url?.url} className={styles.wrapper}>
          {getCardContent()}
        </a>
      )}
    </Card>
  )
}

const useStyles = makeStyles(() => ({
  component: {
    color: colors.main.white,
    padding: '2rem 1rem',
    backgroundColor: colors.main.darkShadeBlue,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: `0px 0px 1rem rgba(20, 25, 40, 0.15)`,
      scale: '1.04',
      transition: '0.3s all',
      '& $arrowClass': {
        color: colors.main.greenishBlue,
      },
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    gap: '1rem',
  },
  title: {
    textAlign: 'center',
    minHeight: '3.25rem',
  },
  icon: {
    color: colors.main.white,
    width: '27',
    height: '27',
  },
  arrowClass: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
  },
}))

export default PromotionalCard
