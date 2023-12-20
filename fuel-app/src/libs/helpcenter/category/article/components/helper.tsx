export const ListWrapper = ({
  type,
  children,
}: {
  type: string
  children: any
}) => {
  if (type === 'numbers') {
    return <ol>{children}</ol>
  }
  return <ul>{children}</ul>
}
