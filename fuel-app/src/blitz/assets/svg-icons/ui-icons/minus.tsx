const MinusIcon = (props: any) => {
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
        d="M25.3346 17.3332L6.66797 17.3332L6.66797 14.6665L25.3346 14.6665L25.3346 17.3332Z"
        fill={color}
      />
    </svg>
  )
}

export default MinusIcon
