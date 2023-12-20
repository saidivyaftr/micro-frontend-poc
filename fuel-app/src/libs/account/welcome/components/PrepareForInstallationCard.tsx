/* eslint-disable @typescript-eslint/indent */
import { Typography, InjectHTML } from '@/shared-ui/components'
import { CardWithTitle } from '@/shared-ui/components/Card/Card'
import CheckMarkRedCell from '@/shared-ui/react-icons/check-mark-red-cell'
import { makeStyles } from '@material-ui/core'
import colors from '@/shared-ui/colors'
import useAppData from '@/shared-ui/hooks/useAppData'
import { useEffect, useState } from 'react'
import { PP_OBJECT_SANS_MEDIUM } from 'src/constants/fontFamilyNames'
import { useWelcomePageData } from 'src/selector-hooks'

const Check = () => <CheckMarkRedCell width="13" height="13" />

const PrepareForInstallationCard = () => {
  const classes = useStyles()
  const [title, setTitle] = useState<any>()
  const [itemsToRender, setItemsTorender] = useState<any>([])
  const { isTechInstallationOrder, isSelfInstallationOrder } =
    useWelcomePageData()
  const data = useAppData('PrepareForYourInstallation', true)

  const {
    techInstall,
    noInstall,
    servicesTitle,
    installationTitle,
    selfInstall,
    selfInstallTitle,
  } = data

  useEffect(() => {
    if (isTechInstallationOrder) {
      setTitle(installationTitle)
      setItemsTorender(techInstall)
    } else if (isSelfInstallationOrder) {
      setTitle(selfInstallTitle)
      setItemsTorender(selfInstall)
    } else {
      setTitle(servicesTitle)
      setItemsTorender(noInstall)
    }
  }, [data])

  return (
    <CardWithTitle className={classes.cardContainer}>
      <>
        <Typography
          styleType="h5"
          className={classes.titleWrapper}
          testId="test-title"
        >
          {title?.value}
        </Typography>
        <div className={classes.content}>
          {itemsToRender?.list?.map((instruction: any, index: number) => {
            return (
              <div key={index} className={classes.step}>
                <div>
                  <Check />
                </div>
                <InjectHTML styleType="p1" value={instruction?.title?.value} />
              </div>
            )
          })}
        </div>
      </>
    </CardWithTitle>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  cardContainer: {
    padding: '2rem 1rem',
    display: 'block',
    [breakpoints.up('xs')]: {
      padding: '2rem 1rem',
    },
    [breakpoints.up('sm')]: {
      padding: '2rem',
    },
    [breakpoints.up('md')]: {
      padding: '3rem',
    },
  },
  titleWrapper: {
    marginBottom: '1rem',
    [breakpoints.up('sm')]: {
      marginBottom: '2rem',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  step: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    '& a': {
      fontFamily: PP_OBJECT_SANS_MEDIUM,
      textDecoration: 'underline',
      '&:hover': {
        color: colors.main.brightRed,
        cursor: 'pointer',
      },
    },
  },
  button: {
    textDecoration: 'underline',
    minWidth: 'auto',
    height: 'auto',
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
    fontFamily: 'PP Object Sans',
    [breakpoints.down('xs')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
}))

export default PrepareForInstallationCard
