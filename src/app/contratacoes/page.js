'use client'

import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/authContext'
import Link from 'next/link'

const Page = () => {
  const [shows, setShows] = useState([])
  const { userId } = useContext(AuthContext)

  // requisição dos artistas contratados 
  useEffect(() => {

    if (!userId) {
      return
    }

    fetch(`https://api-esshow.onrender.com/user/${userId}`, {
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

    fetch(`https://api-esshow.onrender.com/user/shows/${userId}/${id}`, {
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
        <div className='min-h-screen 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 py-16' id="background-image">
          <h1 className='lg:text-4xl md:text-3xl text-xl text-center text-white font-bold pb-16'>CONTRATAÇÕES</h1>

          {shows.length > 0 ? (
            <>
              <div className='grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-4'>
                {shows.map(index => (

                  <div key={index} className='overflow-hidden rounded-t-xl'>
                    <div className='flex flex-col justify-end w-full lg:h-[350px] sm:h-[300px] h-[240px] p-4 rounded-t-xl relative overflow-hidden hover:scale-105 duration-300' style={{ backgroundImage: `url(${index.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                      <div className="absolute inset-0 rounded-xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></div>
                      <p className='z-10 text-white text-2xl font-bold'>{index.artist}</p>
                    </div>
                    <div className='flex flex-col items-center p-4 pt-6 gap-4 rounded-b-xl md:text-base text-sm bg-white' >
                      <p className='font-bold'>Cachê: <span className='font-normal'>{new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(index.cache)}</span></p>
                      <p className='font-bold'>Data: <span className='font-normal'>{index.date}</span></p>
                      <p className='font-bold'>Estado: <span className='font-normal'>{index.estado}</span></p>
                      <p className='font-bold'>Cidade: <span className='font-normal'>{index.cidade}</span></p>
                      <button onClick={() => deleteShow(index._id)} className="py-2 px-4 relative flex items-center justify-center overflow-hidden font-semibold transition duration-300 ease-out border-2 border-amber-400 group" href="/artistas">
                        <span className="absolute flex items-center justify-center w-full h-full text-amber-400 bg-transparent duration-300 -translate-x-full group-hover:translate-x-0">Cancelar Show</span>
                        <span className="absolute flex items-center justify-center w-full h-full text-black bg-amber-400 transition-all duration-300 transform group-hover:translate-x-full ease">Cancelar Show</span>
                        <span className="relative invisible">Cancelar Show</span>
                      </button>
                    </div>

                  </div>

                ))}
              </div>
            </>
          ) : (
            <>
              <div className='h-screen 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 sm:py-16 py-8 font-bold text-xl text-white' id="background-image">
                <p>Por enquanto, você ainda não possui orçamento para nenhum artista. Para ver seus orçamentos, basta selecionar um artista de sua escolha e agendar seu show <Link className='text-purple-400' href="/artistas">Aqui.</Link></p>
              </div>
            </>
          )}

        </div>
      ) : (
        <div className='h-screen 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 sm:py-16 py-8 font-bold text-xl text-white' id="background-image">
          <p>Você ainda não efetuou o login na ES Shows. Para ter acesso aos seus agendamentos, basta realizar o login <Link className='text-purple-400' href="/login">Aqui.</Link></p>
        </div>
      )}
    </>
  )
}

export default Page