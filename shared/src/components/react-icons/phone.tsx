const Icon = (props: any) => {
  const { color } = props
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.22651 1.34107C8.21212 0.684002 9.37017 0.333374 10.5547 0.333374H13.6884C16.271 0.333374 18.5638 1.98595 19.3805 4.43601L22.4688 13.7011C23.0543 15.4576 22.7961 17.386 21.769 18.9266L19.8255 21.8419C19.6493 22.1063 19.6841 22.4584 19.9088 22.6831L31.317 34.0912C31.5417 34.3159 31.8938 34.3508 32.1582 34.1745L35.0734 32.231C36.614 31.204 38.5425 30.9457 40.299 31.5312L49.564 34.6196C52.0141 35.4362 53.6667 37.7291 53.6667 40.3117V43.4453C53.6667 44.6299 53.316 45.7879 52.659 46.7735L50.6364 49.8074C49.029 52.2185 46.323 53.6667 43.4253 53.6667H40.7576C39.9654 53.6667 39.1811 53.5098 38.4499 53.2052L25.0179 47.6085C16.5996 44.1009 9.72356 37.6827 5.64505 29.5257L0.96678 20.1692C0.550214 19.336 0.333344 18.4173 0.333344 17.4859V9.14762C0.333344 7.1415 1.33595 5.26812 3.00514 4.15532L7.22651 1.34107ZM10.5547 5.66671C10.4231 5.66671 10.2944 5.70567 10.1849 5.77867L5.96354 8.59292C5.77808 8.71657 5.66668 8.92472 5.66668 9.14762V17.4859C5.66668 17.5894 5.69077 17.6914 5.73706 17.784L10.4153 27.1406C13.9214 34.1527 19.8324 39.6701 27.0692 42.6854L40.5012 48.2821C40.5824 48.3159 40.6696 48.3334 40.7576 48.3334H43.4253C44.5398 48.3334 45.5806 47.7764 46.1988 46.849L48.2214 43.8151C48.2944 43.7056 48.3333 43.5769 48.3333 43.4453V40.3117C48.3333 40.0247 48.1497 39.7699 47.8775 39.6792L38.6124 36.5909C38.4173 36.5258 38.203 36.5545 38.0318 36.6686L35.1166 38.6121C32.7368 40.1986 29.5681 39.8848 27.5457 37.8624L16.1376 26.4543C14.1152 24.4319 13.8014 21.2632 15.3879 18.8835L17.3314 15.9682C17.4456 15.797 17.4742 15.5828 17.4092 15.3876L14.3208 6.12255C14.2301 5.85033 13.9753 5.66671 13.6884 5.66671H10.5547Z"
        fill={color ? color : '#ff0037'}
      />
    </svg>
  )
}

export default Icon