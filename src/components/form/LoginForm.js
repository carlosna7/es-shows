'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const LoginForm = ({ handleSubmit }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (ev) => {
    ev.preventDefault()

    handleSubmit({ email, password })

    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={submit} className='bg-white flex flex-col md:w-1/2 w-full gap-8 p-10 rounded-xl'>

      <div className='flex flex-col gap-2'>
        <label className='text-sm'>Email</label>
        <input
          className='border-gray-100 border-2 rounded-xl p-2'
          type='email@example.com.br'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-sm'>Password</label>
        <input
          className='border-gray-100 border-2 rounded-xl p-2'
          type='password'
          placeholder='Your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className='flex flex-col items-center gap-2'>
        <button type="submit" className='bg-purple-400 text-black px-3 py-1 w-full'>Login</button>
        <p className='text-xs'>Ainda não tem uma conta? <Link className='text-purple-600' href="/register">Cadastre-se!</Link></p>
      </div>
    </form>
  )
}

export default LoginForm