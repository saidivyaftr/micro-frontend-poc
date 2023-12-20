const QuestionMarkIcon = (props: any) => {
  const { color } = props
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 18C4.7 18 2 15.3 2 12V8C2 4.7 4.7 2 8 2H12C15.3 2 18 4.7 18 8V12C18 15.3 15.3 18 12 18H8ZM12 20C16.4 20 20 16.4 20 12V8C20 3.6 16.4 0 12 0H8C3.6 0 0 3.6 0 8V12C0 16.4 3.6 20 8 20H12ZM11.5 15.5C11.5 16.1 11.1 16.5 10.5 16.5H9.5C8.9 16.5 8.5 16.1 8.5 15.5V14.5C8.5 13.9 8.9 13.5 9.5 13.5H10.5C11.1 13.5 11.5 13.9 11.5 14.5V15.5ZM7.5 7.7C7.5 6.5 8.5 5.5 9.7 5.5H11C11.9 5.5 12.5 6.2 12.5 7C12.5 7.6 12.1 8.1 11.5 8.2H11.4C10 8.4 8.9 9.7 8.9 11.1V12.2H10.9V11.1C10.9 10.6 11.2 10.3 11.7 10.2H11.8C13.3 10 14.5 8.6 14.5 7.1C14.5 5.1 12.9 3.6 11 3.6H9.7C7.4 3.6 5.5 5.5 5.5 7.8H7.5V7.7Z"
        fill={color ? color : '#141928'}
      />
    </svg>
  )
}

export default QuestionMarkIcon
