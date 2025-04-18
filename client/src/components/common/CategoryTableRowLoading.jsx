import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { TableCell, TableRow } from '../ui/table'

const CategoryTableRowLoading = () => {
  return (
    <TableRow>
      <TableCell className="py-4 px-6">
        <Skeleton className="h-4 w-8 rounded-full" />
      </TableCell>

      <TableCell className="py-4 px-6">
        <Skeleton className="h-4 w-40 rounded-full" />
      </TableCell>

      <TableCell className="py-4 px-6">
        <Skeleton className="h-4 w-32 rounded-full" />
      </TableCell>

      <TableCell className="py-4 px-6">
        <Skeleton className="h-4 w-16 rounded-md" />
      </TableCell>

      <TableCell className="py-4 px-6 flex space-x-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </TableCell>
    </TableRow>
  )
}

export default CategoryTableRowLoading