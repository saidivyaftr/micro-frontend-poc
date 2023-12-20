import { CheckAvailability } from 'src/blitz'
import useAppData from '@/shared-ui/hooks/useAppData'

const CheckAvailabilityInfo = () => {
  const {
    titleColorCode,
    buttonText,
    buttonURL,
    buttonTitle,
    signIn,
    buttonhoverVariant,
    linkColorCode,
    backgroundColor,
  } = useAppData('CheckAvailability', true) || {}

  return (
    <CheckAvailability
      titleText={buttonTitle?.value}
      buttonText={buttonText?.value}
      buttonURL={buttonURL?.value}
      linkURL={signIn?.url}
      linkText={signIn?.text}
      containerBgColor={backgroundColor?.targetItem?.color?.value}
      titleColorCode={titleColorCode?.targetItem?.color?.value}
      linkColorCode={linkColorCode?.targetItem?.color?.value}
      buttonhoverVariant={buttonhoverVariant?.type?.field?.value}
      btnEventName={buttonText?.value?.toLowerCase()}
      linkEventName={signIn?.text?.toLowerCase()}
    ></CheckAvailability>
  )
}

export default CheckAvailabilityInfo
