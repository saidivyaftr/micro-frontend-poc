const ClockIcon = (props: any) => {
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
        d="M14.6641 2.6665C8.03664 2.6665 2.66406 8.03909 2.66406 14.6665V17.3332C2.66406 23.9606 8.03664 29.3332 14.6641 29.3332H17.3307C23.9581 29.3332 29.3307 23.9606 29.3307 17.3332V14.6665C29.3307 8.03909 23.9581 2.6665 17.3307 2.6665H14.6641ZM17.3307 5.33317H14.6641C9.5094 5.33317 5.33073 9.51185 5.33073 14.6665V17.3332C5.33073 22.4878 9.5094 26.6665 14.6641 26.6665H17.3307C22.4854 26.6665 26.6641 22.4878 26.6641 17.3332V14.6665C26.6641 9.51185 22.4854 5.33317 17.3307 5.33317ZM23.9922 14.6654V17.332H14.6641V8.00391H17.3307V14.6654H23.9922Z"
        fill={color}
      />
    </svg>
  )
}

export default ClockIcon
