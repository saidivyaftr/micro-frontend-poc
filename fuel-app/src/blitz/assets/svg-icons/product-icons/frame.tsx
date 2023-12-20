const FrameIcon = (props: any) => {
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
        d="M15.3335 15.6333V5.43327H5.13346V15.6333H15.3335ZM4.6668 18.2999H15.8001C17.0001 18.2999 18.0001 17.2999 18.0001 16.0999V4.9666C18.0001 3.7666 17.0001 2.7666 15.8001 2.7666H4.6668C3.4668 2.7666 2.4668 3.7666 2.4668 4.9666V16.0999C2.4668 17.2999 3.4668 18.2999 4.6668 18.2999Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.4002 12.1H22.8669V15.6333H26.4002V12.1ZM22.4002 9.43335H26.8669C28.1335 9.43335 29.1335 10.4334 29.0669 11.6334V16.1C29.0669 17.3 28.0669 18.3 26.8669 18.3H22.4002C21.2002 18.3 20.2002 17.3 20.2002 16.1V11.6334C20.2002 10.4334 21.2002 9.43335 22.4002 9.43335Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.4002 23.2333H22.8669V26.7667H26.4002V23.2333ZM22.4002 20.5667H26.8669C28.1335 20.5667 29.1335 21.5667 29.0669 22.7667V27.2333C29.0669 28.4333 28.0669 29.4333 26.8669 29.4333H22.4002C21.2002 29.4333 20.2002 28.4333 20.2002 27.2333V22.7667C20.2002 21.5667 21.2002 20.5667 22.4002 20.5667Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.8005 23.2333V26.7667H15.3338V23.2333H11.8005ZM11.3338 20.5667H15.8005C17.0005 20.5667 18.0005 21.5667 18.0005 22.7667V27.2333C18.0005 28.4333 17.0005 29.4333 15.8005 29.4333H11.3338C10.1338 29.4333 9.13379 28.4333 9.13379 27.2333V22.7667C9.13379 21.5667 10.1338 20.5667 11.3338 20.5667Z"
        fill={color}
      />
    </svg>
  )
}

export default FrameIcon