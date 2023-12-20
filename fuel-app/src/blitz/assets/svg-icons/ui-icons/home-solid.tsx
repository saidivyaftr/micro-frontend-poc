const HomeSolidIcon = (props: any) => {
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
      <path
        d="M2.59668 14.2333C2.59668 12.6132 3.33342 11.0808 4.59901 10.0687L12.6018 3.6687C14.5503 2.11043 17.319 2.11043 19.2676 3.6687L27.2704 10.0687C28.5359 11.0808 29.2727 12.6132 29.2727 14.2333V24.3367C29.2727 27.2822 26.884 29.67 23.9375 29.67H7.93188C4.98533 29.67 2.59668 27.2822 2.59668 24.3367V14.2333Z"
        fill={color}
      />
    </svg>
  )
}

export default HomeSolidIcon
