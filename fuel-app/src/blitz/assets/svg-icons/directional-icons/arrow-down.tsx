const ArrowDownIcon = (props: any) => {
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
        d="M15.0003 27.8333L15.0003 3.16666L17.667 3.16666L17.667 27.8333L15.0003 27.8333Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.3336 27.281L23.3907 20.2238L25.2764 22.1095L16.3336 31.0523L7.05742 21.7761L8.94304 19.8905L16.3336 27.281Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowDownIcon
