import { Skeleton } from '@/shared-ui/components'
const TableSkelton = ({
  rows = 4,
  width = '100%',
  height = 30,
  margin,
}: any) => {
  const skeletonRows = Array.from({ length: rows }, (_, index) => index)
  return (
    <>
      {skeletonRows?.map((value: number) => (
        <Skeleton
          height={height}
          width={width}
          key={`skeleton-row-${value}`}
          margin={margin}
        />
      ))}
    </>
  )
}

export default TableSkelton
