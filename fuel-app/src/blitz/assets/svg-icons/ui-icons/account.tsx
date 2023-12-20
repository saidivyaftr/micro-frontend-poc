const AccountIcon = (props: any) => {
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
        d="M10.5468 12.3635C10.5468 9.68573 12.7175 7.51499 15.3952 7.51499H16.6074C19.2851 7.51499 21.4558 9.68573 21.4558 12.3635V13.5756C21.4558 16.2533 19.2851 18.4241 16.6074 18.4241H15.3952C12.7175 18.4241 10.5468 16.2533 10.5468 13.5756V12.3635ZM15.3952 9.93923C14.0564 9.93923 12.971 11.0246 12.971 12.3635V13.5756C12.971 14.9145 14.0564 15.9998 15.3952 15.9998H16.6074C17.9462 15.9998 19.0316 14.9145 19.0316 13.5756V12.3635C19.0316 11.0246 17.9462 9.93923 16.6074 9.93923H15.3952Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.5771 2.6665C7.55214 2.6665 2.66797 7.55067 2.66797 13.5756V18.4241C2.66797 24.449 7.55214 29.3332 13.5771 29.3332H18.4255C24.4505 29.3332 29.3346 24.449 29.3346 18.4241V13.5756C29.3346 7.55067 24.4505 2.6665 18.4255 2.6665H13.5771ZM18.4255 5.09075H13.5771C8.89101 5.09075 5.09221 8.88954 5.09221 13.5756V18.4241C5.09221 20.0738 5.563 21.6135 6.37756 22.9162C8.53294 21.2403 11.2415 20.8483 14.1832 20.8483H17.8196C20.7612 20.8483 23.4698 21.2402 25.6251 22.9161C26.4396 21.6134 26.9104 20.0737 26.9104 18.4241V13.5756C26.9104 8.88954 23.1116 5.09075 18.4255 5.09075ZM24.0585 24.7695C22.3268 23.45 20.1647 23.2726 17.8196 23.2726H14.1832C11.8381 23.2726 9.67591 23.45 7.94426 24.7696C9.44251 26.1006 11.4154 26.9089 13.5771 26.9089H18.4255C20.5873 26.9089 22.5602 26.1005 24.0585 24.7695Z"
        fill={color}
      />
    </svg>
  )
}

export default AccountIcon