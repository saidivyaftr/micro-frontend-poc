const BillIcon = (props: any) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16 38H32V34H16V38Z" fill={props.color || '#FF0037'} />
    <path d="M32 31L16 31V27L32 27V31Z" fill={props.color || '#FF0037'} />
    <path
      d="M25.5 11H29.5V14H20C19.7239 14 19.5 14.2239 19.5 14.5V15C19.5 15.2761 19.7239 15.5 20 15.5H27C28.933 15.5 30.5 17.067 30.5 19V19.5C30.5 21.433 28.933 23 27 23H25.5V25H22.5V23H17.5V20H27C27.2761 20 27.5 19.7761 27.5 19.5V19C27.5 18.7239 27.2761 18.5 27 18.5H20C18.067 18.5 16.5 16.933 16.5 15V14.5C16.5 12.567 18.067 11 20 11H22.5V9H25.5V11Z"
      fill={props.color || '#FF0037'}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 2C12.4772 2 8 6.47715 8 12V36C8 41.5228 12.4772 46 18 46H30C35.5228 46 40 41.5228 40 36V12C40 6.47715 35.5228 2 30 2H18ZM12 12C12 8.68629 14.6863 6 18 6H30C33.3137 6 36 8.68629 36 12V36C36 39.3137 33.3137 42 30 42H18C14.6863 42 12 39.3137 12 36V12Z"
      fill={props.color || '#FF0037'}
    />
  </svg>
)
export default BillIcon
