import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import { RouteBlogSearch } from '@/helpers/route';

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  function handleChange(e) {
    setQuery(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate(RouteBlogSearch(query))
  }

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <Input type="text" onChange={handleChange} className={'w-full md:w-96 rounded-full'} placeholder="Search" />
    </form>
  )
}

export default SearchBox