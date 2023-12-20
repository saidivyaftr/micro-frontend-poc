import { useAppData } from 'src/hooks'
import { Hero } from '@/shared-ui/components'
import { makeStyles } from '@material-ui/core'
import clx from 'classnames'
import colors from '@/shared-ui/colors'

const HeroImage: React.FC = () => {
  const classes = useStyles()
  const {
    heading,
    image,
    subHeading,
    mobileImage,
    legalText,
    toolTipText,
    signUpButtonText,
    signUpButtonHref,
  } = useAppData('heroImage', true) || {}

  const splitTitle = heading?.value.split(' ') || []
  const firstTitle = splitTitle.splice(0, 1).join(' ')
  const firstTitle2 = splitTitle.splice(0, 2).join(' ')
  const secondTitle = splitTitle.splice(0, splitTitle.length).join(' ')

  return (
    <Hero
      backgroundColor="gravity"
      title1={`${firstTitle} <br> ${firstTitle2}`}
      title1Color={'tertiary'}
      title2={secondTitle}
      title2Color={'tertiary'}
      subHeader={subHeading?.value}
      subHeaderColor={'tertiary'}
      backgroundImage={image?.src}
      mobileBackgroundImage={mobileImage?.src}
      legalText={legalText?.value}
      legalStyleType={'p3'}
      toolTipText={toolTipText?.value}
      removeStripes={false}
      stripeColor="primary"
      primaryButton={{
        text: signUpButtonText?.value,
        type: 'link',
        href: signUpButtonHref?.url,
      }}
      className={clx('hero', classes.hero)}
    />
  )
}

const useStyles = makeStyles({
  hero: {
    position: 'relative',
    zIndex: 0,
    '& path': {
      fill: colors.main.dark,
    },
  },
})

export default HeroImage
