'use client'

import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { FaCircleUser } from "react-icons/fa6"

const UserCard = () => {
  const [isOpen, setIsOpen] = useState('')
  const [ userData, setUserData] = useState('')
  const { userId } = useContext(AuthContext)
  const route = useRouter() 
  const userCardRef = useRef(null)

  // carrega os dados do usuario
  useEffect(() => {
    if(userId) {
      fetch(`https://api-esshow.onrender.com/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => response.json())
        .then((data) => {
  
          setUserData(data)
  
        })
        .catch((erro) => {
          console.log(erro)
        })
    }
  }, [userId])

  // identificar click fora div principal para poder fechar o mini modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userCardRef.current && !userCardRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  
  const logout = () => {
    localStorage.removeItem('userToken')
    route.push("/login")
  }

  return (
    <div ref={userCardRef}>

      {userId ? (
        <>
          <h2 onClick={handleClick} className='bg-amber-400 text-black px-3 py-1 cursor-pointer'>{userData.name}</h2>
          {isOpen ?
            <>
              <div className='z-10 absolute w-[200px] bg-white p-4 gap-2 text-black rounded-lg top-28 flex flex-col items-center'>
                <FaCircleUser className='text-6xl text-gray-700' />
                <p>{userData.name}</p>
                <p className='bg-amber-400 text-black px-3 py-1 cursor-pointer' onClick={logout}>logout</p>
              </div>
            </>
            : null}
        </>
      ) : (
        <Link onClick={handleClick} href="/login" className='bg-amber-400 text-black px-3 py-1 cursor-pointer'>LOGIN</Link>
      )}

    </div>
  )
}

export default UserCard