const CirclePlusIcon = (props: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        xmlns="http://www.w3.org/2000/svg"
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="11.5"
        stroke="#141928"
        fill="white"
      />{' '}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 13L11 19H13V13H19V11L13 11V5H11L11 11L5 11V13H11Z"
        fill="#161617"
      />
    </svg>
  )
}

export default CirclePlusIcon
