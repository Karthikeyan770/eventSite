import React from 'react'
import Link from 'next/link';
import { PER_PAGE } from '@/config/index';

const Pagination = ({pageNo, total}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(total / PER_PAGE); i++) {
    pages.push(i);
  };
  return (
    <div className='flex justify-between items-center'>
        {pages.map(page => (
            <Link href={`/events?page=${page}`} key={page} className={page == pageNo ? 'bg-orange-500 text-white hover:text-black hover:bg-orange-700 py-1 px-2' 
            : ' hover:text-sky-600'}>{page}</Link>
        ))}
    </div>
  )
}

export default Pagination