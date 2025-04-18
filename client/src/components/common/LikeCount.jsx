import React, { useEffect, useState } from 'react'
import useFetch from '@/helpers/useFetch'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from '../ui/skeleton'

const LikeCount = ({ blogId }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [likeStatus, setLikeStatus] = useState(false);
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const { loading, data: likeCountData } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/like/count/${blogId}`, {
        method: "GET", headers: {
            'Content-type': 'application/json'
        }
    }, []);

    useEffect(() => {
        setLikeCount(likeCountData)
    }, [likeCountData]);


    const { data: likeStatusData } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/like/check/${user?._id || ""}/${blogId || ""}`, {
        method: "GET", headers: {
            'Content-type': 'application/json'
        }
    }, []);

    useEffect(() => {
        setLikeStatus(likeStatusData)
    }, [likeStatusData]);


    async function handleToogleLike() {
        try {
            if (!isAuthenticated) {
                navigate('/sign-in')
                return
            }
            const data = { blog: blogId, user: user._id }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/like/toggle`, {
                method: "POST", headers: {
                    'Content-type': 'application/json',
                }, body: JSON.stringify(data)
            })

            const result = await response.json();
            if (!response.ok) {
                throw result
            }
            setLikeStatus(pre => !pre)
            setLikeCount(result.likeCount)
        } catch (error) {
            toast.success(error.message);
        }
    }

    return (
        <>
            {loading ?
                <Skeleton className="h-5 w-[35px]" />
                : <div className='flex items-center gap-2'>
                    <div>{likeCount}</div>
                    <button onClick={handleToogleLike}>
                        <svg
                            className={`w-5 h-5 fill-current ${likeStatus ? 'text-red-500' : 'text-white'
                                }`}
                            viewBox="0 0 24 24"
                            stroke="black"
                            strokeWidth="2"
                        >
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                stroke="black"
                                strokeWidth="1"
                            />
                        </svg>
                    </button>
                </div>}
        </>
    )
}

export default LikeCount