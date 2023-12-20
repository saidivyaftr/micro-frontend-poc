const SymmetricalSpeedIcon = (props: any) => {
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
        d="M11.0013 4.6665H8.33464V19.3332H11.0013V4.6665ZM16.668 20.9998L9.66797 27.9998L2.66797 20.9998L4.66797 18.9998L9.66797 23.9998L14.668 18.9998L16.668 20.9998ZM15.3359 11.6667L22.3359 4.66666L29.3359 11.6667L27.3359 13.6667L22.3359 8.66666L17.3359 13.6667L15.3359 11.6667ZM21.0026 28H23.6693V13.3333H21.0026L21.0026 28Z"
        fill={color}
      />
    </svg>
  )
}
export default SymmetricalSpeedIcon
