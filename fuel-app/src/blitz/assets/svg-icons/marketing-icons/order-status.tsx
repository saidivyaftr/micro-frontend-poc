const OrderStatusIcon = (props: any) => {
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
        d="M24 27.9999H8.66667C6.2 27.9999 4.66667 25.9333 4.66667 23.9999V15.9999C4.66667 13.9999 6.13333 12.3999 8 12.0666V15.9999H10.6667V11.9999H21.3333V15.9999H24V11.9999C26.2 11.9999 28 13.7999 28 15.9999V23.9999C28 26.1333 26.2667 27.9999 24 27.9999ZM29.3333 27.9999C29.8 27.3333 30.6667 25.9333 30.6667 23.9999V15.9999C30.6667 12.3333 27.6667 9.33325 24 9.33325V6.66659C24 3.73325 21.6 1.33325 18.6667 1.33325H13.3333C10.4 1.33325 8 3.73325 8 6.66659V9.33325C4.6 9.66659 2 12.5333 2 15.9999V23.9999C2 26.2666 3 27.4666 3.33333 27.9999C4.53333 29.5999 6.46667 30.6666 8.66667 30.6666H24C26.2 30.6666 28.1333 29.5999 29.3333 27.9999ZM21.3333 9.33325V6.66659C21.3333 5.19992 20.1333 3.99992 18.6667 3.99992H13.3333C11.8667 3.99992 10.6667 5.19992 10.6667 6.66659V9.33325H21.3333Z"
        fill={color}
      />
    </svg>
  )
}
export default OrderStatusIcon
