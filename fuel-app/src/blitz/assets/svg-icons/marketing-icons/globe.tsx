const GlobeIcon = (props: any) => {
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
        d="M17.5 1C24.9558 1 31 7.04416 31 14.5V17.5C31 24.9558 24.9558 31 17.5 31H14.5C7.04416 31 1 24.9558 1 17.5V14.5C1 7.04416 7.04416 1 14.5 1H17.5ZM11.0184 4.59097C8.36839 5.52204 6.20466 7.48611 5.01045 10H9.08976C9.40772 8.46474 9.84643 7.06033 10.3866 5.84485C10.5809 5.40779 10.7914 4.98806 11.0184 4.59097ZM4.10633 13C4.03626 13.4899 4 13.9907 4 14.5V17.5C4 18.0093 4.03626 18.5101 4.10633 19H8.64148C8.54841 18.0281 8.5 17.0243 8.5 16C8.5 14.9757 8.54841 13.9719 8.64148 13H4.10633ZM5.01045 22C6.20467 24.5139 8.36839 26.478 11.0184 27.409C10.7914 27.0119 10.5809 26.5922 10.3866 26.1551C9.84643 24.9397 9.40772 23.5353 9.08976 22H5.01045ZM20.9816 27.409C23.6316 26.478 25.7953 24.5139 26.9896 22H22.9102C22.5923 23.5353 22.1536 24.9397 21.6134 26.1551C21.4191 26.5922 21.2086 27.0119 20.9816 27.409ZM27.8937 19C27.9637 18.5101 28 18.0093 28 17.5V14.5C28 13.9907 27.9637 13.4899 27.8937 13H23.3585C23.4516 13.9719 23.5 14.9757 23.5 16C23.5 17.0243 23.4516 18.0281 23.3585 19H27.8937ZM26.9896 10C25.7953 7.48611 23.6316 5.52204 20.9816 4.59097C21.2086 4.98805 21.4191 5.40779 21.6134 5.84485C22.1536 7.06033 22.5923 8.46474 22.9102 10H26.9896ZM16 28C15.6596 28 15.2225 27.8511 14.6986 27.3525C14.167 26.8466 13.6201 26.0437 13.1281 24.9367C12.7507 24.0876 12.423 23.0985 12.1625 22H19.8375C19.577 23.0985 19.2493 24.0876 18.8719 24.9367C18.3799 26.0437 17.833 26.8466 17.3014 27.3525C16.7775 27.8511 16.3404 28 16 28ZM12.1625 10C12.423 8.90147 12.7507 7.91238 13.1281 7.06327C13.6201 5.95632 14.167 5.15339 14.6986 4.64749C15.2225 4.14895 15.6596 4 16 4C16.3404 4 16.7775 4.14895 17.3014 4.64749C17.833 5.15339 18.3799 5.95632 18.8719 7.06327C19.2493 7.91238 19.577 8.90147 19.8375 10H12.1625ZM11.5 16C11.5 17.0392 11.5548 18.0436 11.6567 19H20.3433C20.4452 18.0436 20.5 17.0392 20.5 16C20.5 14.9608 20.4452 13.9564 20.3433 13H11.6567C11.5548 13.9564 11.5 14.9608 11.5 16Z"
        fill={color}
      />
    </svg>
  )
}

export default GlobeIcon