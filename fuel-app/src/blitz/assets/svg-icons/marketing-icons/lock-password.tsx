const LockPasswordIcon = (props: any) => {
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
        d="M11.9517 22.6668H10.7954V21.6566L9.91018 22.1617L9.33203 21.172L10.2172 20.6668L9.33203 20.1617L9.91018 19.172L10.7954 19.6771V18.6668H11.9517V19.6771L12.8369 19.172L13.415 20.1617L12.5298 20.6668L13.415 21.172L12.8369 22.1617L11.9517 21.6566V22.6668Z"
        fill={color}
      />
      <path
        d="M15.4206 22.6668H16.5768V21.6566L17.462 22.1617L18.0402 21.172L17.155 20.6668L18.0402 20.1617L17.462 19.172L16.5768 19.6771V18.6668H15.4206V19.6771L14.5354 19.172L13.9572 20.1617L14.8424 20.6668L13.9572 21.172L14.5354 22.1617L15.4206 21.6566V22.6668Z"
        fill={color}
      />
      <path
        d="M20.0457 22.6668H21.202V21.6566L22.0872 22.1617L22.6654 21.172L21.7802 20.6668L22.6654 20.1617L22.0872 19.172L21.202 19.6771V18.6668H20.0457V19.6771L19.1605 19.172L18.5824 20.1617L19.4676 20.6668L18.5824 21.172L19.1605 22.1617L20.0457 21.6566V22.6668Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.332 1.3335C11.6501 1.3335 8.66536 4.31826 8.66536 8.00016V8.50016H11.332V8.00016C11.332 5.79102 13.1229 4.00016 15.332 4.00016H16.6654C18.8745 4.00016 20.6654 5.79102 20.6654 8.00016V10.6668H11.9987C8.3168 10.6668 5.33203 13.6516 5.33203 17.3335V24.0002C5.33203 27.6821 8.3168 30.6668 11.9987 30.6668H19.9987C23.6806 30.6668 26.6654 27.6821 26.6654 24.0002V17.3335C26.6654 14.8659 25.3247 12.7114 23.332 11.5587V8.00016C23.332 4.31826 20.3473 1.3335 16.6654 1.3335H15.332ZM23.9987 17.3335C23.9987 15.1244 22.2078 13.3335 19.9987 13.3335H11.9987C9.78956 13.3335 7.9987 15.1244 7.9987 17.3335V24.0002C7.9987 26.2093 9.78956 28.0002 11.9987 28.0002H19.9987C22.2078 28.0002 23.9987 26.2093 23.9987 24.0002V17.3335Z"
        fill={color}
      />
    </svg>
  )
}
export default LockPasswordIcon