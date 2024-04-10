'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const RegisterForm = ({ handleSubmit }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (ev) => {
    ev.preventDefault()

    handleSubmit({ name, email, password })

    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={submit} className='bg-white flex flex-col md:w-1/2 w-full gap-8 p-10 rounded-xl'>

      <div className='flex flex-col gap-2'>
        <label className='flex flex-col gap-2'>Name</label>
        <input
          className='border-gray-100 border-2 rounded-xl p-2'
          type='text'
          placeholder='Your name here'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label className='flex flex-col gap-2'>Email</label>
        <input
          className='border-gray-100 border-2 rounded-xl p-2'
          type='email@example.com.br'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label className='flex flex-col gap-2'>Password</label>
        <input
          className='border-gray-100 border-2 rounded-xl p-2'
          type='password'
          placeholder='Your pass'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className='flex flex-col items-center gap-2'>
        <button type="submit" className='bg-purple-400 text-black p-2 w-full'>Cadastrar</button>
      </div>
    </form>
  )
}

export default RegisterForm