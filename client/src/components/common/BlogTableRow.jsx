import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Edit, Trash, ViewIcon } from 'lucide-react'
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
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/route'

function DeleteButton({ blogId, getData }) {
    async function handleDelete(getBlogId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/blog/delete/${getBlogId}`, {
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
                <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. It will permanently remove this blog and its related data.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(blogId)} >Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}

const BlogTableRow = ({ srNo, blogData, handleEdit, getData }) => {
    const titleText=blogData.title.split(" ").slice(0,4).join(" ");
    const more=blogData.title.split(" ").length>4 ? "...":"";
    const title=titleText+more;
    return (
        <TableRow>
            <TableCell className="font-medium">{srNo + 1}</TableCell>
            <TableCell>{blogData.user.name}</TableCell>
            <TableCell>{blogData.category.name}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{new Date(blogData.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{blogData.status.toString()}</TableCell>
            <TableCell className={'space-x-2'}>
                <Button asChild><Link to={RouteBlogDetails(blogData.category.slug,blogData.slug)} ><ViewIcon /></Link></Button>
                <Button onClick={() => handleEdit(blogData)} ><Edit /></Button>
                <DeleteButton blogId={blogData._id} getData={getData} />
            </TableCell>
        </TableRow>
    )
}

export default BlogTableRow