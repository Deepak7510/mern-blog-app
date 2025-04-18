import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CalendarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/route'

const BlogCard = ({ blogData }) => {

    return (
        <Link to={RouteBlogDetails(blogData.category.slug,blogData.slug)}>
            <Card  className='h-full py-2'>
                <CardContent className={'space-y-1 px-3.5'} >
                    <div className='flex gap-3'>
                        <Avatar className={'w-11 h-11'}>
                            {
                                blogData && blogData?.user.avatar ?
                                    <AvatarImage src={blogData.user.avatar}  className={'object-cover'} />
                                    : <AvatarFallback className={'font-bold text-lg'}>{blogData.user.name[0]}</AvatarFallback>
                            }
                        </Avatar>
                        <div>
                            <div className='text-md font-medium'>{blogData.user.name}</div>
                            <div className='flex gap-1 items-center text-gray-600'>
                                <CalendarCheck className='h-3 w-3' />
                                <div className='text-xs'>  {new Date(blogData.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>
                    <div className='h-52 rounded overflow-hidden'>
                        <img src={blogData.thumbnail} alt="" className='w-full h-full object-cover' />
                    </div>

                    <div className='line-clamp-2 font-medium text-md'>{blogData.title}</div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default BlogCard