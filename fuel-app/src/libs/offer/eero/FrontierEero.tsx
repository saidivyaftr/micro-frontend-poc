import { makeStyles } from '@material-ui/core'
import { TwoColumnLayout, Button, InjectHTML } from '@/shared-ui/components'
import { CheckMarkThin } from '@/shared-ui/react-icons'
import { COMPONENT_WRAPPER } from 'src/constants'
import { useAppData } from 'src/hooks'

import colors from '@/shared-ui/colors'
const FrontierEero = () => {
  const classes = useStyles()

  const {
    titleImage,
    subTitle,
    primaryButtonLink,
    primaryButtonText,
    image,
    perks,
    mobileImage,
    legalText,
  }: any = useAppData('frontierEero', true)

  if (!perks || perks?.length === 0) {
    return null
  }
  const ImageContent = () => (
    <div id="frontier-eero" className={classes.ImageContent}>
      <div className={classes.NonImageWrapper}>
        {titleImage?.src && (
          <img
            src={titleImage?.src}
            alt={titleImage?.alt}
            className={classes.logoStyles}
            data-testid="frontierEero-image"
          />
        )}
        {subTitle?.value && (
          <InjectHTML
            tagType="p"
            styleType="p1"
            className={classes.description}
            value={subTitle?.value}
          />
        )}
        <ul className={classes.perksList}>
          {perks?.list?.map((perk: any, index: number) => {
            return (
              <li
                key={`perk-${perk?.title?.value}-${index}`}
                className={classes.bullets}
              >
                <div className={classes.iconWrapper}>
                  <CheckMarkThin />
                </div>
                <InjectHTML styleType="p1" value={perk?.title?.value} />
              </li>
            )
          })}
        </ul>
        {legalText?.value && (
          <InjectHTML
            className={classes.legalText}
            tagType="p"
            data-testid="caption"
            styleType="legal"
            value={legalText?.value}
          />
        )}
        {primaryButtonText?.value && (
          <Button
            type="link"
            href={primaryButtonLink?.url}
            text={primaryButtonText?.value}
            className={classes.btnLearn}
            hoverVariant="secondary"
          />
        )}
      </div>
    </div>
  )

  return (
    <div className={classes.wrapper}>
      <TwoColumnLayout
        imageWrapperClassName={classes.imageWrapper}
        gridClassName={classes.grid}
        image={image?.src}
        mobileImage={mobileImage?.src}
        title={image?.alt}
        content={<ImageContent />}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  wrapper: {
    ...COMPONENT_WRAPPER,
    padding: 0,
    margin: '4rem auto',
    [breakpoints.down('sm')]: {
      padding: '1rem',
      marginBottom: '3rem',
    },
  },
  ImageContent: {
    backgroundColor: colors.main.greenishBlue,
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    padding: '3rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.down('xs')]: {
      borderTopLeftRadius: 32,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 32,
      padding: '2rem 1rem',
    },
  },
  NonImageWrapper: {
    maxWidth: 385,
  },

  imageWrapper: {
    [breakpoints.up('md')]: {
      height: '100%',
    },
    '& img': {
      display: 'flex',
      borderTopRightRadius: 32,
      borderBottomRightRadius: 32,
      [breakpoints.down('xs')]: {
        borderBottomRightRadius: 32,
        borderBottomLeftRadius: 32,
        borderTopRightRadius: 0,
      },
    },
  },
  logoStyles: {
    maxWidth: '100%',
  },
  grid: {
    flexWrap: 'initial',
    [breakpoints.up('md')]: {
      '& > div:nth-of-type(2)': {
        minWidth: 630,
        [breakpoints.down('xs')]: {
          minWidth: '100%',
        },
      },
      '& > div:first-of-type': {
        maxWidth: 570,
        [breakpoints.down('xs')]: {
          minWidth: '100%',
        },
      },
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  description: {
    marginBottom: 0,
    marginTop: 0,
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },

    '& p': {
      marginBottom: 0,
      marginTop: 10,
    },
  },
  btnLearn: {
    marginTop: '1rem',
    fontSize: '1.125rem',
    marginRight: 'auto',
    [breakpoints.up('sm')]: {
      width: 'fit-content',
    },
  },
  perksList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: 16,
    marginTop: 10,
  },
  bullets: {
    display: 'flex',
    minHeight: 24,
    marginBottom: 8,
    '& sup': {
      lineHeight: 0,
    },
  },
  iconWrapper: {
    marginRight: 10,
    marginTop: 2,
    '& svg': {
      width: 16,
      height: 16,
    },
    '& path': {
      stroke: colors.main.midnightExpress,
    },
  },
  legalText: {
    color: 'inherit',
  },
}))

export default FrontierEero
