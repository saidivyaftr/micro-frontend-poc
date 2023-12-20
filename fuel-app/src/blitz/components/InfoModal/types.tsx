export interface IInfoModal {
  isOpen: boolean
  isClosable?: boolean
  isLoading?: boolean
  onClose?: () => void
  title?: string
  subTitle?: string
  logo?: any
  isFooterCloseButton?: boolean
  buttonName?: string
  modalContentClassName?: string
  className?: string
  children?: any
}
