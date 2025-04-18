import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useFetch from '@/helpers/useFetch'
import CommentsTableRow from '@/components/common/CommentsTableRow'
import CommentsTableRowLoading from '@/components/common/CommentsTableRowLoading'

const Comments = () => {
    const { getData, data, loading } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/comment/fetch`, { method: "GET", headers: { 'Content-Type': 'application/json' } }, []);

    return (
        <Card className='m-2 md:m-3'>
            <CardContent>
                <Table>
                <TableCaption>Total Comment : {data?.length}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sr_No</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>User Name</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ?
                            Array(10).fill(null).map((_, index) => {
                                return <CommentsTableRowLoading key={index} />
                            })
                            : (data && data?.length > 0 ? data.map((item, index) => (
                                <CommentsTableRow srNo={index} key={item._id} getData={getData} commentItem={item} />
                            )) :
                               <TableRow>
                                 <TableCell>No Comments</TableCell>
                               </TableRow>
                            )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default Comments;
