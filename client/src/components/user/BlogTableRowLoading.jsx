import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'

const BlogTableRowLoading = () => {
  return (
    <TableRow>
    <TableCell><Skeleton className="w-6 h-4" /></TableCell>
    <TableCell><Skeleton className="w-24 h-4" /></TableCell>
    <TableCell><Skeleton className="w-24 h-4" /></TableCell>
    <TableCell><Skeleton className="w-36 h-4" /></TableCell>
    <TableCell><Skeleton className="w-20 h-4" /></TableCell>
    <TableCell><Skeleton className="w-16 h-4" /></TableCell>
    <TableCell className="space-x-2 flex">
        <Skeleton className="w-8 h-8 rounded-md" />
        <Skeleton className="w-8 h-8 rounded-md" />
        <Skeleton className="w-8 h-8 rounded-md" />
    </TableCell>
</TableRow>
  )
}

export default BlogTableRowLoading