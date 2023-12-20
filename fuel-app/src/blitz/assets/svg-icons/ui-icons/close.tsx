const CloseIcon = (props: any) => {
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
        d="M15.9428 17.8284L22 23.8856L23.8856 22L17.8284 15.9428L23.8857 9.88562L22 8L15.9428 14.0572L9.88562 8L8 9.88562L14.0572 15.9428L8.00004 22L9.88566 23.8856L15.9428 17.8284Z"
        fill={color}
      />
    </svg>
  )
}

export default CloseIcon
