'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import UserCard from '../user/UserCard'
import { FaBars } from "react-icons/fa6"

const Navbar = () => {
  
	const [ openNavbar, setOpenNavbar ] = useState(false)

  const toggleState = (state) => {
		state((prev) => !prev)
	}

  return (
    <header className='z-10 bg-zinc-900 flex justify-between 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 py-8'>
      
      <div className='flex gap-4 items-center'>
        <img 
          className='h-12'
          src='/es-shows-logo.png'
          alt='logo'
        />
        <Link href="/" className='sm:text-3xl text-2xl font-bold text-white'>ES Shows</Link>
      </div>

      <div className='flex text-white'>
       <div className='md:flex hidden gap-8 items-center '>
          <Link href="/contratacoes">CONTRATAÇÕES</Link>
          <Link href="/artistas">ARTISTAS</Link>
          <UserCard/>
        </div>
        <div className='md:hidden flex gap-4 items-center'>
          <FaBars className='text-3xl' onClick={() => {toggleState(setOpenNavbar)}}/>
          <UserCard/>
        </div>
      </div>

      <>
      {openNavbar ? (

        <>
          <div className='bg-white absolute w-full right-0 top-24 gap-4 md:hidden flex flex-col sm:px-20 px-8 py-6 z-10'>
            <Link href="/contratacoes" className='bg-slate-800 hover:bg-slate-500 text-white p-2 rounded-md'>CONTRATAÇÕES</Link>
            <Link href="/artistas" className='bg-slate-800 hover:bg-slate-500 text-white p-2 rounded-md'>ARTISTAS</Link>
          </div>
        </>

      ) : null}
      </>

    </header>
  )
}

export default Navbar