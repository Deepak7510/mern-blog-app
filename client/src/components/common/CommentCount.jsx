import useFetch from '@/helpers/useFetch'
import { MessageCircleIcon } from 'lucide-react'
import React from 'react'
import { Skeleton } from '../ui/skeleton'

const CommentCount = ({ blogId }) => {
    const { loading, data: commentCount } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/comment/count/${blogId}`, {
        method: "GET", headers: {
            'Content-type': 'application/json'
        }
    }, [])
    return (
        <>
            {loading ? <Skeleton className={'h-5 w-[35px]'} />
                :
                <div className='flex gap-2 items-center'><div>{commentCount}</div><MessageCircleIcon className='h-4 w-4' /></div>
            }
        </>
    )
}

export default CommentCount