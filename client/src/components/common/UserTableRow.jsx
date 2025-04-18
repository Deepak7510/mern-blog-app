import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import {Trash } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function DeleteButton({ userId, getData }) {
    async function handleDelete(getUserId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/delete/${getUserId}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (!response.ok) {
                const result = await response.json();
                throw result;
            }
            const result = await response.json();
            if (result.success) {
                getData()
                toast.success(result.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    return <AlertDialog>
        <AlertDialogTrigger asChild><Button><Trash /></Button></AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete User?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. It will permanently remove this user and its related data.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(userId)} >Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}

const UsersTableRow = ({ srNo, userItems, getData }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{srNo + 1}</TableCell>
            <TableCell>{userItems.role}</TableCell>
            <TableCell>{userItems.name}</TableCell>
            <TableCell>{userItems.email}</TableCell>
            <TableCell>
            <Avatar className={'w-11 h-11'}>
              {
                userItems && userItems?.avatar ?
                <AvatarImage src={userItems.avatar}  className={'object-cover'}/>
                  : <AvatarFallback className={'font-bold text-lg'}>{userItems.name[0]}</AvatarFallback>
              }
            </Avatar>
            </TableCell>
            <TableCell>{new Date(userItems.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className={'space-x-2'}>
                <DeleteButton userId={userItems._id} getData={getData} />
            </TableCell>
        </TableRow>
    )
}

export default UsersTableRow