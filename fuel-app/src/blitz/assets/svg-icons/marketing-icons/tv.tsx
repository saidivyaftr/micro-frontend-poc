const TvIcon = (props: any) => {
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
        d="M7.9987 1.3335C4.3168 1.3335 1.33203 4.31826 1.33203 8.00016V18.6668C1.33203 19.1235 1.37794 19.5694 1.46539 20.0002H3.9987V8.00016C3.9987 5.79102 5.78956 4.00016 7.9987 4.00016H23.9987C26.2078 4.00016 27.9987 5.79102 27.9987 8.00016V20.0002H30.532C30.6195 19.5694 30.6654 19.1235 30.6654 18.6668V8.00016C30.6654 4.31826 27.6806 1.3335 23.9987 1.3335H7.9987Z"
        fill={color}
      />
      <path
        d="M29.3325 22.6668H2.66488C3.88115 24.2861 5.81761 25.3335 7.9987 25.3335H14.6654V28.0002H6.66536V30.6668H25.332V28.0002H17.332V25.3335H23.9987C26.1798 25.3335 28.1162 24.2861 29.3325 22.6668Z"
        fill={color}
      />
      <path
        d="M23.9987 7.3335L14.6654 16.6668L16.6654 18.6668L25.9987 9.3335L23.9987 7.3335Z"
        fill={color}
      />
      <path
        d="M5.9987 16.6668L15.332 7.3335L17.332 9.3335L7.9987 18.6668L5.9987 16.6668Z"
        fill={color}
      />
    </svg>
  )
}
export default TvIcon
