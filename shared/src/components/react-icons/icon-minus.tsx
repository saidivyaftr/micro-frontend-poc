const IconMinus = (props: any) => {
  const { color = 'white' } = props
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
        d="M16.3337 10.8333L4.66699 10.8333L4.66699 9.16667L16.3337 9.16667L16.3337 10.8333Z"
        fill={color}
      />
    </svg>
  )
}

export default IconMinus
