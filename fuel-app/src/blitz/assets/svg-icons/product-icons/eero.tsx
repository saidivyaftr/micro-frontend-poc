const EeroIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.9587 13.2202C21.1945 11.9291 19.019 11.1668 16.6654 11.1668H15.3321C13.0137 11.1668 10.8681 11.9064 9.11837 13.1626L7.5363 11.0154C9.72871 9.43276 12.4215 8.50016 15.3321 8.50016H16.6654C19.6194 8.50016 22.349 9.46077 24.5588 11.0867L22.9587 13.2202Z"
        fill={color}
      />
      <path
        d="M21.3584 15.3539C20.0401 14.3975 18.4186 13.8335 16.6654 13.8335H15.3321C13.606 13.8335 12.0076 14.3801 10.7005 15.3098L12.2829 17.4572C13.147 16.854 14.1982 16.5002 15.3321 16.5002H16.6654C17.8183 16.5002 18.8857 16.866 19.758 17.4878L21.3584 15.3539Z"
        fill={color}
      />
      <path
        d="M13.332 21.8335C13.332 20.3607 14.5259 19.1668 15.9987 19.1668C17.4715 19.1668 18.6654 20.3607 18.6654 21.8335C18.6654 23.3063 17.4715 24.5002 15.9987 24.5002C14.5259 24.5002 13.332 23.3063 13.332 21.8335Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.33203 10.5002C1.33203 5.7137 5.21223 1.8335 9.9987 1.8335H21.9987C26.7852 1.8335 30.6654 5.7137 30.6654 10.5002V22.5002C30.6654 27.2866 26.7852 31.1668 21.9987 31.1668H9.9987C5.21223 31.1668 1.33203 27.2866 1.33203 22.5002V10.5002ZM9.9987 4.50016H21.9987C25.3124 4.50016 27.9987 7.18645 27.9987 10.5002V22.5002C27.9987 25.8139 25.3124 28.5002 21.9987 28.5002H9.9987C6.68499 28.5002 3.9987 25.8139 3.9987 22.5002V10.5002C3.9987 7.18645 6.68499 4.50016 9.9987 4.50016Z"
        fill={color}
      />
    </svg>
  )
}

export default EeroIcon