export interface IModalProps extends React.HTMLAttributes<HTMLElement> {
  modalContent: any
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  height?: string
  width?: string
  maxHeight?: string
  maxWidth?: string
  padding?: string
  background?: string
  borderRadius?: string
  onCloseFocusElementID?: string
  videoModal?: boolean
  stopDefaultExit?: boolean
  margin?: string
  hasArticle?: boolean
  videoTitle?: string
  videoDesc?: string
  modalContainerClassName?: string
  modalCloseIconClassName?: string
  iconColor?: string
  strokeWidth?: string
  showCloseButton?: boolean
}
