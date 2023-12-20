const SpeedDownIcon = (props: any) => {
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
        d="M0 17.6C0 25.5529 6.4471 32 14.4 32H17.6C25.5529 32 32 25.5529 32 17.6V14.4C32 6.4471 25.5529 0 17.6 0H14.4C6.4471 0 0 6.4471 0 14.4V17.6ZM14.4 28.8H17.6C23.7856 28.8 28.8 23.7856 28.8 17.6V14.4C28.8 8.21441 23.7856 3.2 17.6 3.2L17.6 18.4L22 14L24.4 16.4L16 24.8L7.6 16.4L10 14L14.4 18.4L14.4 3.2C8.21441 3.2 3.2 8.21441 3.2 14.4V17.6C3.2 23.7856 8.21441 28.8 14.4 28.8Z"
        fill={color}
      />
    </svg>
  )
}
export default SpeedDownIcon
