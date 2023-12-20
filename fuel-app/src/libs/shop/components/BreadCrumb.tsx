import { useAppData } from 'src/hooks'
import colors from '@/shared-ui/colors'
import { Breadcrumbs, Link, makeStyles } from '@material-ui/core'
import { InjectHTML } from '@/shared-ui/components'

const BreadCrumb = () => {
  const breadCrumbs = useAppData('breadCrumbs', true)
  const classes = useStyles()
  return (
    <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
      {breadCrumbs?.parentName?.value && (
        <Link
          href={`${breadCrumbs?.parentPath?.url}`}
          className={classes.boldText}
        >
          <InjectHTML
            fontType="boldFont"
            styleType="legal"
            data-testid="parentPageName"
            value={breadCrumbs?.parentName?.value}
          />
        </Link>
      )}
      {breadCrumbs?.name?.value && (
        <InjectHTML
          fontType="regularFont"
          styleType="legal"
          data-testid="currentPageName"
          value={breadCrumbs?.name?.value}
        />
      )}
    </Breadcrumbs>
  )
}

const useStyles = makeStyles(({}) => ({
  breadcrumbs: {
    textTransform: 'capitalize',
    maxWidth: '1200px',
    margin: 'auto',
    padding: '20px 16px',
    fontSize: '12px',
    color: colors.main.blackCoral,
    '& sup': {
      fontSize: '0.5em',
      position: 'relative',
      top: '-1px',
    },
  },
  boldText: {
    color: '#141928',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export default BreadCrumb
