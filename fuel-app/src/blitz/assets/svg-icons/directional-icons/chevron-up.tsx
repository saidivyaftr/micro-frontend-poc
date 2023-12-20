const ChevronUpIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.2734 20.5573L24.3878 22.4429L15.664 13.719L6.94011 22.4429L5.05449 20.5573L15.664 9.94778L26.2734 20.5573Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronUpIcon
