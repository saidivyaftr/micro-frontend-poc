const ArrowDownRightIcon = (props: any) => {
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
        d="M23.213 25.6193L5.71301 8.11935L7.59863 6.23373L25.0986 23.7337L23.213 25.6193Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.9984 24.4961L23.9984 13.8333L26.667 13.8333L26.667 27.1667L13.3337 27.1667L13.3337 24.4961L23.9984 24.4961Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowDownRightIcon
