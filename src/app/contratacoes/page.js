'use client'

import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/authContext'
import Link from 'next/link'

const page = () => {

  const [shows, setShows] = useState([])
  const { userId } = useContext(AuthContext)

  // requisição dos artistas contratados 
  useEffect(() => {

    if (!userId) {
      return
    }

    fetch(`http://localhost:5000/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {

        setShows(data.shows)

      })
      .catch((erro) => {
        console.log(erro)
      })
  }, [userId])

  const deleteShow = (id) => {

    fetch(`http://localhost:5000/user/shows/${userId}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {

        setShows((prevShows) => prevShows.filter((show) => show._id !== id))

      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  return (
    <>
      {userId ? (
        <div className='min-h-screen 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 py-16 bg-gray-200'>
          <h1 className='text-4xl pb-16'>Contratações</h1>

          {shows.length > 0 ? (
            <>
              <div className='grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-4'>
                {shows.map(index => (

                  <div>
                    <div className='flex flex-col justify-end w-full lg:h-[350px] sm:h-[300px] h-[240px] p-4 rounded-t-xl relative' key={index._id} style={{ backgroundImage: `url(${index.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                      <div className="absolute inset-0 rounded-xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></div>
                      <p className='z-10 text-white text-2xl font-bold'>{index.artist}</p>
                    </div>
                    <div key={index._id} className='flex flex-col items-center p-4 gap-4 rounded-b-xl md:text-base text-sm bg-white' >
                      <p>Cachê: R$ {index.cache}</p>
                      <p>Data: {index.date}</p>
                      <p>Estado: {index.estado}</p>
                      <p>Cidade: {index.cidade}</p>
                      <button onClick={() => deleteShow(index._id)} className='bg-amber-400 p-2'>Cancelar Show</button>
                    </div>

                  </div>

                ))}
              </div>
            </>
          ) : (
            <>
              <div className='h-screen 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 sm:py-16 py-8 font-bold text-xl'>
                <p>Por enquanto, você ainda não possui orçamento para nenhum artista. Para ver seus orçamentos, basta selecionar um artista de sua escolha e agendar seu show <Link className='text-purple-400' href="/artistas">Aqui.</Link></p>
              </div>
            </>
          )}

        </div>
      ) : (
        <div className='h-screen 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 sm:py-16 py-8 font-bold text-xl'>
          <p>Você ainda não efetuou o login na ES Shows. Para ter acesso aos seus agendamentos, basta realizar o login <Link className='text-purple-400' href="/login">Aqui.</Link></p>
        </div>
      )}
    </>
  )
}

export default page