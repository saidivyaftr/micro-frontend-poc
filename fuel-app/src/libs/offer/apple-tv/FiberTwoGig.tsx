import { makeStyles } from '@material-ui/core'
import { Button } from '@/shared-ui/components'
import { TwoColumnLayout, Typography, InjectHTML } from '@/shared-ui/components'
import { CheckMarkBlack } from '@/shared-ui/react-icons'
import { APPLE_TV, COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const TwoGig = () => {
  const classes = useStyles()
  const {
    benefits,
    buttonLink,
    buttonText,
    image,
    subTitle,
    title,
    legalNote,
  } = useAppData('fiberTwoGig', true)

  const onButtonClick = () => {
    //@ts-ignore
    s_objectID = APPLE_TV.replace('{NAME}', buttonText?.value)
  }

  const NonImageContent = () => (
    <div id="two-gig" className={classes.NonImageContainer}>
      <Typography
        tagType="h3"
        styleType="h3"
        className={classes.TwoGigImageTitle}
      >
        {title?.value}
      </Typography>
      <InjectHTML
        tagType="h5"
        styleType="h5"
        className={classes.TwoGigImageSubTitle}
        value={subTitle?.value}
      />
      <ul className={classes.benifits}>
        {benefits?.list?.map((item: any, i: number) => (
          <li key={i} className={classes.checkList}>
            <CheckMarkBlack />
            <InjectHTML
              tagType="span"
              styleType="p2"
              value={item?.text?.value}
              className={classes.descriptionPoints}
            />
          </li>
        ))}
      </ul>
      {legalNote?.value && (
        <Typography tagType="p" styleType="legal" className={classes.legal}>
          {legalNote?.value}
        </Typography>
      )}
      <Button
        text={buttonText?.value}
        href={buttonLink?.url}
        className={classes.checkAvailBtn}
        variant="primary"
        type="link"
        onClick={onButtonClick}
      />
    </div>
  )

  return (
    <div className={classes.root}>
      <TwoColumnLayout
        image={image?.src}
        webpImage={image?.webp}
        title={title?.value}
        content={<NonImageContent />}
        reverse={true}
      />
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    padding: '32px 0px',
  },
  TwoGigImageTitle: {
    maxWidth: 600,
    marginBottom: 16,
    [breakpoints.down('sm')]: {
      fontSize: 30,
      lineHeight: '38px',
    },
  },
  benifits: {
    marginTop: '1rem',
    marginBottom: 0,
  },
  descriptionPoints: {
    '& sup': {
      fontSize: '.5rem',
      position: 'relative',
    },
  },
  TwoGigImageSubTitle: {
    marginTop: 0,
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  NonImageContainer: {
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.main.newBackgroundGray,
    [breakpoints.down('sm')]: {
      padding: 32,
      flex: 1,
    },
    '& ul': {
      listStyle: 'none',
      padding: 0,
      '& li': {
        display: 'flex',
        alignItems: 'center',
        '& svg': { display: 'block', minWidth: '20px' },
      },
    },
  },
  list: {
    marginBottom: 0,
  },
  legal: {
    margin: '0 auto 30px 36px',
  },
  checkAvailBtn: {
    maxWidth: 300,
    marginTop: '1rem',
    [breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  checkList: {
    marginBottom: 8,
    '& svg': {
      marginRight: 16,
    },
  },
}))

export default TwoGig
