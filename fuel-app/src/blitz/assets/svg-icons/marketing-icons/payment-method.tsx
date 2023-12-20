const PaymentMethodIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_20864_288385)">
        <path
          d="M21.1172 14H20.1172V15.3333H18.1172V14H14.7839V12H21.1172C21.3013 12 21.4505 11.8508 21.4505 11.6667V11.3333C21.4505 11.1492 21.3013 11 21.1172 11H16.4505C15.1619 11 14.1172 9.95533 14.1172 8.66667V8.33333C14.1172 7.04467 15.1619 6 16.4505 6H18.1172V4.66667H20.1172V6H22.7839V8H16.4505C16.2664 8 16.1172 8.14924 16.1172 8.33333V8.66667C16.1172 8.85076 16.2664 9 16.4505 9H21.1172C22.4059 9 23.4505 10.0447 23.4505 11.3333V11.6667C23.4505 12.9553 22.4059 14 21.1172 14Z"
          fill={color}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M28.1172 0C30.3263 0 32.1172 1.79086 32.1172 4V16C32.1172 17.7416 31.0041 19.2233 29.4505 19.7724V28C29.4505 30.2091 27.6597 32 25.4505 32H4.11719C1.90805 32 0.117188 30.2091 0.117188 28V12.6667C0.117188 10.4575 1.90805 8.66667 4.11719 8.66667H5.45052V4C5.45052 1.79086 7.24138 0 9.45052 0H28.1172ZM5.45052 16C5.45052 18.2091 7.24138 20 9.45052 20L26.7839 20V22.6667L2.78385 22.6667L2.78385 12.6667C2.78385 11.9303 3.38081 11.3333 4.11719 11.3333H5.45052V16ZM29.4505 4C29.4505 3.26362 28.8536 2.66667 28.1172 2.66667L9.45052 2.66667C8.71414 2.66667 8.11719 3.26362 8.11719 4L8.11719 16C8.11719 16.7364 8.71414 17.3333 9.45052 17.3333H28.1172C28.8536 17.3333 29.4505 16.7364 29.4505 16V4ZM2.78385 25.3333V28C2.78385 28.7364 3.38081 29.3333 4.11719 29.3333L25.4505 29.3333C26.1869 29.3333 26.7839 28.7364 26.7839 28V25.3333L2.78385 25.3333Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_20864_288385">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.117188)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
export default PaymentMethodIcon