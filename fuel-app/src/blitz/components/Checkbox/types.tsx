export interface ICheckbox {
  type?: IInputType
  label?: string
  checked?: boolean
  disabled?: boolean
  className?: string
  name?: string
  onChange?: () => void
}
export type IInputType = 'checkbox'
