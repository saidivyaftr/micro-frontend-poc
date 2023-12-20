const PrintIcon = (props: any) => {
  const { color = '#141928' } = props
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.66832 1.1709H8.00165H24.0017H25.335V2.50423V9.1709C27.335 9.1709 29.1624 10.7462 30.0017 12H2.00165C2.84089 10.7462 4.66832 9.33329 6.66832 9.31958V2.50423V1.1709ZM1.33497 14.6666C1.31077 14.8855 1.33498 14.9456 1.33498 15.1709V20.5042C1.33498 23.3597 3.99633 26.4159 6.66832 27.0222V29.1709V30.5042H8.00165H24.0017H25.335V29.1709V27.0222C28.007 26.4159 30.6683 23.3597 30.6683 20.5042L30.6683 14.6666H28.0017V20.5042C28.0017 21.8711 26.5123 23.7125 25.335 24.2269V18.5042V17.1709H24.0017H8.00165H6.66832V18.5042V24.2269C5.49105 23.7125 4.00165 21.8711 4.00165 20.5042V15.1709C4.00165 14.9426 4.00165 14.6666 4.00165 14.6666H1.33497ZM22.6683 3.83757V9.1709H9.33498V3.83757H22.6683ZM22.6683 27.8376H9.33498V19.8376H22.6683V27.8376Z"
        fill={color}
      />
    </svg>
  )
}

export default PrintIcon