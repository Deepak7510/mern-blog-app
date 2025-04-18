import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import { Avatar } from '../ui/avatar'

const UserTableRowLoading = () => {
  return (
    <TableRow>
    <TableCell><Skeleton className="w-6 h-4" /></TableCell>
    <TableCell><Skeleton className="w-16 h-4" /></TableCell>
    <TableCell><Skeleton className="w-24 h-4" /></TableCell>
    <TableCell><Skeleton className="w-32 h-4" /></TableCell>
    <TableCell>
        <Avatar className="w-11.5 h-11.5">
            <Skeleton className="w-full h-full rounded-full" />
        </Avatar>
    </TableCell>
    <TableCell><Skeleton className="w-20 h-4" /></TableCell>
    <TableCell className="space-x-2">
        <Skeleton className="w-8 h-8 rounded-md" />
    </TableCell>
</TableRow>
  )
}

export default UserTableRowLoading