const Icon = (props: any) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="1" y="1" width="14" height="14" rx="7" fill="#434753" />
    <path
      d="M5 8L7.25 10.5L11 5.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="1" y="1" width="14" height="14" rx="7" stroke="#434753" />
  </svg>
)
export default Icon
