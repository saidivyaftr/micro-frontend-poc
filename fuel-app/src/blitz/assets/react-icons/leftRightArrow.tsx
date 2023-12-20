const LeftRightArrow = (props: any) => {
  const { color = '#FF0037' } = props
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 24L6.5 13.5L17 3L20 6L14.5 11.5L41.5 11.5V15.5L14.5 15.5L20 21L17 24ZM31 24L41.5 34.5L31 45L28 42L33.5 36.5L6.5 36.5V32.5L33.5 32.5L28 27L31 24Z"
        fill={color}
      />
    </svg>
  )
}

export default LeftRightArrow
