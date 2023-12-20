const DeleteIcon = (props: any) => {
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
        d="M11.9974 4.00016H19.9974L19.9974 6.66683H11.9974V4.00016ZM9.33073 6.66683V4.00016C9.33073 2.5274 10.5246 1.3335 11.9974 1.3335H19.9974C21.4702 1.3335 22.6641 2.5274 22.6641 4.00016V6.66683H29.3307V9.3335H22.6641H19.9974H11.9974H9.33073L2.66406 9.33349V6.66683L9.33073 6.66683ZM5.33073 23.3335V12.0002H2.66406V23.3335C2.66406 27.7518 6.24578 31.3335 10.6641 31.3335H21.3307C25.749 31.3335 29.3307 27.7518 29.3307 23.3335V12.0002H26.6641V23.3335C26.6641 26.279 24.2762 28.6668 21.3307 28.6668H10.6641C7.71854 28.6668 5.33073 26.279 5.33073 23.3335ZM9.33073 12.0002L9.33073 24.6668H11.9974L11.9974 12.0002H9.33073ZM14.6641 24.6668L14.6641 12.0002H17.3307L17.3307 24.6668H14.6641ZM19.9974 24.6668L19.9974 12.0002H22.6641V24.6668H19.9974Z"
        fill={color}
      />
    </svg>
  )
}

export default DeleteIcon
