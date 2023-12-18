const Icon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="15"
      height="24"
      viewBox="0 0 15 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 2L12 12L2 22" stroke={color} strokeWidth="3" />
    </svg>
  )
}
export default Icon
