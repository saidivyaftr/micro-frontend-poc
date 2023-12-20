const ArrowUpRightIcon = (props: any) => {
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
        d="M25.7551 8.63028L7.60925 26.7762L5.72363 24.8905L23.8695 6.74466L25.7551 8.63028Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.0615 8.49999L13.333 8.49999L13.333 5.83331L26.6663 5.83331L26.6467 19.1666L23.9801 19.1666L24.0615 8.49999Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowUpRightIcon
