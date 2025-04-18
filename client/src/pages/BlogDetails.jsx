import BlogComment from '@/components/common/BlogComment';
import CommentCount from '@/components/common/CommentCount';
import LikeCount from '@/components/common/LikeCount';
import RelatedBlog from '@/components/common/RelatedBlog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import useFetch from '@/helpers/useFetch';
import { CalendarCheck } from 'lucide-react';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const decodeHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.innerHTML;
};

const BlogDetails = () => {
    const navigate = useNavigate();
    const { category, blog } = useParams();

    if (!blog || !category) {
        navigate('/')
    }

    const { data: blogData, loading } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/blog/details/${blog}`, {
        method: "GET", headers: {
            'Content-type': 'application/json'
        }
    }, [category, blog])

    return (
        <>
            <div className='flex flex-col lg:flex-row w-full gap-4 p-3'>
                <Card className={'w-full lg:w-[70%] py-3'}>
                    <CardContent className={'space-y-2  px-4'}>
                        {blogData && !loading ?
                            <>
                                <div className='flex justify-between items-center'>
                                    <div className='flex gap-4'>
                                        <Avatar className={'w-12 h-12'}>
                                            {
                                                blogData && blogData?.user.avatar ?
                                                    <AvatarImage src={blogData.user.avatar} alt="profile-avatar"  className={'object-cover'} />
                                                    : <AvatarFallback className={'font-bold text-lg'}>{blogData.user.name[0]}</AvatarFallback>
                                            }
                                        </Avatar>
                                        <div>
                                            <div className='text-md font-medium'>{blogData.user.name}</div>
                                            <div className='flex gap-2 items-center text-gray-600'>
                                                <CalendarCheck className='h-3 w-3' />
                                                <div className='text-xs'>  {new Date(blogData.createdAt).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-3' >
                                        <LikeCount blogId={blogData._id} />
                                        <CommentCount blogId={blogData._id} />
                                    </div>
                                </div>
                                <div className='text-lg font-normal' >{blogData.title}</div>
                                <div className='h-52 sm:h-[350px] md:h-[400px] lg:h-[450px]'>
                                    <img src={blogData.thumbnail} alt="thumnail-image" className='w-full h-full object-cover rounded' />
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: decodeHTML(blogData?.content) }}></div>
                                <Separator />
                                <BlogComment blogId={blogData._id} />
                            </> : <>
                                <div className='flex justify-between items-center'>
                                    <div className="flex items-center space-x-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[250px]" />
                                            <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                    </div>
                                    <div className='flex gap-3' >
                                    <Skeleton className="h-5 w-[35px]" />
                                    <Skeleton className="h-5 w-[35px]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                                <Skeleton className="h-[450px] w-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </>
                        }
                    </CardContent>
                </Card>
                <Card className={'w-full h-fit lg:w-[30%]'}>
                    <CardContent>
                        <RelatedBlog category={category} blog={blog} />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default BlogDetails
