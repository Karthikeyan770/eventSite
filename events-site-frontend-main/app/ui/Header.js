'use client';
import logo from '@/public/next.svg';
import Link from 'next/link';
import Image from 'next/image';
import Search from './Search';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

const Header = () => {
  const {user, logout} = useContext(AuthContext);
  return (
    <header className='w-full flex flex-col md:flex-row justify-between items-center px-8 py-4'>
      <div>
        <Link href='/' className='flex gap-2 items-center'>
          <Image src={logo} alt='logo' className='w-10 h-10'/>
          <h3 className='font-bold text-orange-700 text-2xl'>Nxt Events</h3>
        </Link>
      </div>
      <Search />
      <nav className='flex flex-row gap-8 items-center'>
        <Link href='/events'>Events</Link>
        {user? (
        <div className='flex gap-8 items-center'>
          <Link href='/events/add'>Add Events</Link>
          <Link href='/account/dashboard'>Dashboard</Link>
        </div>
        ) : null}
        {user ? <div className='bg-black hover:bg-slate-800 text-white px-3 py-2
        rounded-lg flex items-center gap-2'>
          <FaSignOutAlt /> 
          <button onClick={() => {logout()}}>Logout</button>
        </div> : <div className='bg-black hover:bg-slate-800 text-white px-3 py-2
        rounded-lg flex items-center gap-2'>
          <FaSignInAlt /> 
          <Link href='/account/login'>Login</Link>
        </div>}
      </nav>
    </header>
  )
}

export default Header
