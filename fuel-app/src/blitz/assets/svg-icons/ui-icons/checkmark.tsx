const CheckmarkIcon = (props: any) => {
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
        d="M27.6693 8L25.6693 6L12.3359 19.3333L7.33594 14.3333L5.33594 16.3333L10.3359 21.3333L12.3359 23.3333L14.3359 21.3333L27.6693 8Z"
        fill={color}
      />
    </svg>
  )
}

export default CheckmarkIcon
