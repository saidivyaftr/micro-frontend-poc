const UpgradeIcon = (props: any) => {
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
        d="M0 14.4C0 6.4471 6.4471 0 14.4 0H17.6C25.5529 0 32 6.4471 32 14.4V17.6C32 25.5529 25.5529 32 17.6 32H14.4C6.4471 32 0 25.5529 0 17.6V14.4ZM14.4 3.2H17.6C23.7856 3.2 28.8 8.21441 28.8 14.4V17.6C28.8 23.7856 23.7856 28.8 17.6 28.8L17.6 13.6L22 18L24.4 15.6L16 7.2L7.6 15.6L10 18L14.4 13.6L14.4 28.8C8.21441 28.8 3.2 23.7856 3.2 17.6V14.4C3.2 8.21441 8.21441 3.2 14.4 3.2Z"
        fill={color}
      />
    </svg>
  )
}
export default UpgradeIcon
