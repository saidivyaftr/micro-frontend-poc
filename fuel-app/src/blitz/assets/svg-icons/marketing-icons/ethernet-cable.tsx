const EthernetCableIcon = (props: any) => {
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
        d="M22.657 4.46297H26.8712C27.2388 4.46297 27.5369 4.76102 27.5369 5.12869V16.3433C27.5369 16.711 27.2388 17.009 26.8712 17.009L23.614 17.009H20.9511V20.9618H11.0484V17.009H8.38548L5.12845 17.009C4.76078 17.009 4.46272 16.711 4.46272 16.3433V5.12869C4.46272 4.76102 4.76078 4.46297 5.12845 4.46297H9.34256V9.74219C9.34256 10.4775 9.93868 11.0736 10.674 11.0736C11.4094 11.0736 12.0055 10.4775 12.0055 9.74219V4.46297H14.6683V9.74219C14.6683 10.4775 15.2644 11.0736 15.9998 11.0736C16.7351 11.0736 17.3312 10.4775 17.3312 9.74219V4.46297H19.994V9.74219C19.994 10.4775 20.5902 11.0736 21.3255 11.0736C22.0609 11.0736 22.657 10.4775 22.657 9.74219V4.46297ZM26.8712 19.672H23.614V20.9618C23.614 22.4325 22.4218 23.6247 20.9511 23.6247H17.3312V28.8686C17.3312 29.6039 16.7351 30.2 15.9997 30.2C15.2644 30.2 14.6683 29.6039 14.6683 28.8686V23.6247H11.0484C9.57771 23.6247 8.38548 22.4325 8.38548 20.9618V19.672H5.12845C3.29009 19.672 1.7998 18.1817 1.7998 16.3433V5.12869C1.7998 3.29033 3.29009 1.80005 5.12845 1.80005H26.8712C28.7095 1.80005 30.1998 3.29033 30.1998 5.12869V16.3433C30.1998 18.1817 28.7095 19.672 26.8712 19.672Z"
        fill={color}
      />
    </svg>
  )
}

export default EthernetCableIcon
