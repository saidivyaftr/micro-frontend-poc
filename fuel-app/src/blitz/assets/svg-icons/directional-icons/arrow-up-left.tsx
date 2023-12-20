const ArrowUpLeftIcon = (props: any) => {
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
        d="M8.44198 7.05721L26.2655 24.8807L24.3799 26.7664L6.55636 8.94283L8.44198 7.05721Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.99772 7.97589L7.99772 18.4898L5.34277 18.5L5.33301 5.16667L18.6663 5.16667L18.6663 7.97589L7.99772 7.97589Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowUpLeftIcon
