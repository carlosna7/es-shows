'use client'

import React, { useContext, useEffect } from 'react'
import { MsgContext } from '@/context/msgContext'

const Message = () => {

  const { message } = useContext(MsgContext)

  // useEffect(() => {

  //   if(message) {
  //     setTimeout(() => {
  //       console.log('remover')
  //       // setMessage(null)
  //     }, 5000)
  //   }

  // }, [message])

  return (
    <>
      {message && (
        <p className='bg-green-500 rounded-xl p-2 absolute left-0 top-0 w-[300px]'>
          {message}
        </p>
      )}
    </>
  )
}

export default Message