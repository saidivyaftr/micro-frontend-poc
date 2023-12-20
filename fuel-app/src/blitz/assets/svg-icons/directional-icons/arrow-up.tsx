const ArrowUpIcon = (props: any) => {
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
        d="M17.3337 5.16668L17.3337 29.8333L14.667 29.8333L14.667 5.16668L17.3337 5.16668Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.0004 5.71896L8.94324 12.7762L7.05762 10.8905L16.0004 1.94772L25.2766 11.2239L23.3909 13.1095L16.0004 5.71896Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowUpIcon
