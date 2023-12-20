const ChangeIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.3311 16.001L4.33105 9.00098L11.3311 2.00098L13.3311 4.00098L9.66439 7.66764L27.6644 7.66764V10.3343L9.66439 10.3343L13.3311 14.001L11.3311 16.001ZM20.6657 16.001L27.6657 23.001L20.6657 30.001L18.6657 28.001L22.3324 24.3343L4.33236 24.3343L4.33236 21.6676L22.3324 21.6676L18.6657 18.001L20.6657 16.001Z"
        fill={color}
      />
    </svg>
  )
}

export default ChangeIcon
