import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
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
import UsersTableRow from '@/components/common/UserTableRow'
import UserTableRowLoading from '@/components/common/UserTableRowLoading'

const Users = () => {
    const { getData, data, loading } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/fetch`, { method: "GET", headers: { 'Content-Type': 'application/json' } }, []);

    return (
        <Card className='m-2 md:m-3'>
            <CardContent>
                <Table>
                <TableCaption>Total User : {data?.length}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sr_No</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading?
                            Array(10).fill(null).map((_, index) => {
                                return <UserTableRowLoading key={index} />
                            })
                            : (data && data?.length > 0 ? data.map((item, index) => (
                                <UsersTableRow srNo={index} key={item._id} getData={getData} userItems={item} />
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

export default Users;
