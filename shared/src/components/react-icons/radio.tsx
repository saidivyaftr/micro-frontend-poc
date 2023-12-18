const RadioIcon = (props: any) =>
  props.checked ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="#2D3548" />
      <circle cx="12" cy="12" r="7" fill="#96FFF5" />
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#898C93" />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="#2D3548" />
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#898C93" />
    </svg>
  )

export default RadioIcon
