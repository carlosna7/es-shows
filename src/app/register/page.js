'use client'

import RegisterForm from '@/components/form/RegisterForm'
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MsgContext } from '@/context/msgContext'

const Page = () => {

  const route = useRouter()
  const { handleMessage } = useContext(MsgContext)

  // register API
  const registerUser = (user) => {

    fetch('https://api-esshow.onrender.com/user/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {

        if(data.msg) {
          handleMessage(data.msg)
          route.push('/login')
        }
        if(data.error) {
          handleMessage(data.error)
          route.push('/')
        }

      })
      .catch((erro) => {
        console.log(erro)
      })

  }

  return (
    <div className='flex md:flex-row flex-col gap-8 md:justify-between justify-center items-center 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 h-screen' id="background-image"> 

      <div className='flex flex-col md:gap-16 sm:gap-8 gap-4 md:text-left text-center md:w-1/2 w-full text-white'>
        <h1 className='xl:text-7xl lg:text-6xl sm:text-5xl text-4xl font-bold'>ES Shows</h1>
        <p className='sm:text-2xl texl-xl'>Faça seu cadastro e comece a gerencia seus shows agora mesmo!</p>
      </div>
      <RegisterForm handleSubmit={registerUser} />
    </div>
  )
}

export default Page