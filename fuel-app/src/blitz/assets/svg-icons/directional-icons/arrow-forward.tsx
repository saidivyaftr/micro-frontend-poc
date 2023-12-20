const ArrowForwardIcon = (props: any) => {
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
        d="M27.3337 17.8333H2.66699V15.1667H27.3337V17.8333Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.7809 16.5L19.7238 9.44281L21.6094 7.55719L30.5522 16.5L21.276 25.7761L19.3904 23.8905L26.7809 16.5Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowForwardIcon
