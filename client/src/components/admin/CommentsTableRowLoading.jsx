import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'

const CommentsTableRowLoading = () => {
    return (
        <TableRow>
            <TableCell><Skeleton className="w-6 h-4" /></TableCell>
            <TableCell className="line-clamp-1"><Skeleton className="w-32 h-4" /></TableCell>
            <TableCell><Skeleton className="w-24 h-4" /></TableCell>
            <TableCell><Skeleton className="w-48 h-4" /></TableCell>
            <TableCell><Skeleton className="w-20 h-4" /></TableCell>
            <TableCell className="space-x-2">
                <Skeleton className="w-8 h-8 rounded-md" />
            </TableCell>
        </TableRow>
    )
}

export default CommentsTableRowLoading