'use client'

import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/authContext'
import { useRouter } from 'next/navigation'

const UserCard = () => {
  const [isOpen, setIsOpen] = useState('')
  const [ userData, setUserData] = useState('')
  const { userId } = useContext(AuthContext)
  const route = useRouter()

  useEffect(() => {
    if(userId) {
      fetch(`http://localhost:5000/user/${userId}`, {
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

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  
  const logout = () => {
    localStorage.removeItem('userToken')
    route.push("/")
  }

  return (
    <div onClick={handleClick}>

      {userId ? (
        <>
          <h2 className='bg-amber-400 text-black px-3 py-1'>{userData.name}</h2>
          {isOpen ?
            <>
              <div className='absolute h-[200px] w-[200px] bg-white text-black '>
                <p>{userData.name}</p>
                <p onClick={logout}>logout</p>
              </div>
            </>
            : null}
        </>
      ) : (
        <Link href="/login" className='bg-amber-400 text-black px-3 py-1'>LOGIN</Link>
      )}


    </div>
  )
}

export default UserCard