const ServicesIcon = (props: any) => {
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
      <g clip-path="url(#clip0_20864_288324)">
        <path
          d="M21.3333 21.3332C20.597 21.3332 20 21.9301 20 22.6665C20 23.4029 20.597 23.9998 21.3333 23.9998H25.3333C26.0697 23.9998 26.6667 23.4029 26.6667 22.6665C26.6667 21.9301 26.0697 21.3332 25.3333 21.3332H21.3333Z"
          fill={color}
        />
        <path
          d="M5.33333 25.3332C5.33333 24.5968 5.93029 23.9998 6.66667 23.9998C7.40305 23.9998 8 24.5968 8 25.3332C8 26.0695 7.40305 26.6665 6.66667 26.6665C5.93029 26.6665 5.33333 26.0695 5.33333 25.3332Z"
          fill={color}
        />
        <path
          d="M12 23.9998C11.2636 23.9998 10.6667 24.5968 10.6667 25.3332C10.6667 26.0695 11.2636 26.6665 12 26.6665C12.7364 26.6665 13.3333 26.0695 13.3333 25.3332C13.3333 24.5968 12.7364 23.9998 12 23.9998Z"
          fill={color}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.33333 2.6665C6.22876 2.6665 5.33333 3.56193 5.33333 4.6665V5.99984C5.33333 6.87065 5.88987 7.61148 6.66667 7.88603V15.9998H4.66667C2.08934 15.9998 0 18.0892 0 20.6665V27.3332C0 29.9105 2.08934 31.9998 4.66667 31.9998H27.3333C29.9107 31.9998 32 29.9105 32 27.3332V20.6665C32 18.0892 29.9107 15.9998 27.3333 15.9998H9.33333V7.88603C10.1101 7.61148 10.6667 6.87065 10.6667 5.99984V4.6665C10.6667 3.56193 9.77124 2.6665 8.66667 2.6665H7.33333ZM2.66667 20.6665C2.66667 19.5619 3.5621 18.6665 4.66667 18.6665H27.3333C28.4379 18.6665 29.3333 19.5619 29.3333 20.6665V27.3332C29.3333 28.4377 28.4379 29.3332 27.3333 29.3332H4.66667C3.5621 29.3332 2.66667 28.4377 2.66667 27.3332V20.6665Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_20864_288324">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ServicesIcon