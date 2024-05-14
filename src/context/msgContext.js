'use client'

import Message from '@/components/layout/Message'
import React, { createContext, useState } from 'react'

const MsgContext = createContext()

// aqui saberemos se o token de login esta ativo, pois sem ele estar ativo o contexto fara com que o usuario seja deslogado e precise fazer login novamente

const MsgProvider = ({ children }) => {

  const [ message, setMessage ] = useState(null)

  const handleMessage = (msg) => {
    setMessage(msg)

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <MsgContext.Provider value={{ message, handleMessage }}>
      {children}
      {/* <Message/> */}
    </MsgContext.Provider>
  )
}

export { MsgContext, MsgProvider }