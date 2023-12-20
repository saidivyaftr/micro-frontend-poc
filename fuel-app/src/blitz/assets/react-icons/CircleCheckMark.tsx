const CircleCheckMark = (props: any) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12.8203" cy="12" r="10.875" fill="#141928" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.4392 8.29239L17.4911 7.34424L11.1701 13.6652L8.79971 11.2949L7.85156 12.243L10.2219 14.6134L11.1701 15.5615L12.1182 14.6134L18.4392 8.29239Z"
        fill="#96FFF5"
      />
    </svg>
  )
}

export default CircleCheckMark
