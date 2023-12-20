const ArrowDownLeftIcon = (props: any) => {
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
        d="M6.96529 23.6307L24.3722 6.22376L26.2578 8.10938L8.85091 25.5163L6.96529 23.6307Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.00426 24.5L18.667 24.5L18.667 27.1667L5.33366 27.1667L5.33366 13.8333L8.00426 13.8333L8.00426 24.5Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowDownLeftIcon
