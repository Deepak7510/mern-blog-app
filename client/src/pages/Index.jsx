import BlogCard from '@/components/common/BlogCard'
import BlogCardLoading from '@/components/common/BlogCardLoading';
import useFetch from '@/helpers/useFetch'
import React from 'react'

const Index = () => {
  const { data: blogData, loading } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/blog/fetch`, { method: "GET", headers: { 'Content-Type': 'application/json' } }, []);
  return (
    <div className='m-2 md:m-3'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3'>
        {loading ?
          Array(6).fill(null).map((_, index) => {
            return <BlogCardLoading key={index} />
          })
          :
          blogData && blogData.length > 0 ? blogData.map(item => {
            return <BlogCard key={item._id} blogData={item} />
          }) : <div className='text-lg text-gray-700'>No Blogs</div>
        }
      </div>
    </div>
  )
}

export default Index