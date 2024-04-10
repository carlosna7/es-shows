'use client'

import ArtistsGrid from '@/components/artists/ArtistsGrid'
import { AuthContext } from '@/context/authContext'
import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
// import { HiAdjustmentsHorizontal } from "react-icons/hi2"

const Page = () => {
  const { spotifyToken } = useContext(AuthContext)
  const [artistId, setArtistId] = useState('')
  const [artistData, setArtistData] = useState('')
  const [name, setName] = useState('')

  // Captura os dados do artista com o ID pego anteriormente
  // Esta dentro do useEffect, pois essa funcção só pode ser chamada após ter o ID, ou seja, sempre que o ID sofrer alteração ela pode ser chamada e o token é renovado
  useEffect(() => {
    const getArtistData = () => {

      fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + spotifyToken
        },
      })
        .then((response) => response.json())
        .then((data) => {

          setArtistData(data)

        })
        .catch((erro) => {
          console.log(erro)
        })
    }

    if (artistId !== '') {
      getArtistData()
    }

  }, [artistId])

  // Captura o ID do artista pesquisado
  const getArtistId = () => {
    fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + spotifyToken
      },
    })
      .then((response) => response.json())
      .then((data) => {

        setArtistId(data.artists.items[0].id)

      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  // Pesquisa o nome do artista
  const submit = async (ev) => {
    ev.preventDefault()

    getArtistId()

    setName('')
  }

  return (
    <section className='bg-gray-200 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 md:py-16 py-8'>

      <div className='bg-white rounded-xl md:p-8 p-4 flex flex-col items-center gap-4'>
        <h1 className='text-lg'>Busque mais de 1000 artistas!</h1>

        {/* Caso o usuario não esteja logado, mostrar uma mensagem para ele logar e um botão com link direcionando-o para a tela de loggin */}

        <form onSubmit={submit} className='flex gap-4 w-full items-center'>
          <input
            className='bg-gray-100 w-full h-10 rounded-lg px-4'
            type='text'
            placeholder='Qual artista você está procurando?'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='flex items-center justify-center bg-amber-400 h-10 w-10 rounded-lg'>
            <FaSearch />
          </button>
        </form>


      </div>

      <div className='flex justify-between md:pt-16 pt-8 2xl:gap-8 gap-4'>
        <div className='xl:flex hidden flex-col p-4 bg-white w-[300px] h-full rounded-xl'>
          <div className='flex justify-center border-b-2 border-black pb-4 text-lg font-bold'>
            <h2>FILTROS</h2>
          </div>

          <ul className='flex flex-col pt-4 px-8 gap-2'>
            <li className='hover:text-amber-400'>Influenciadores</li>
            <li className='hover:text-amber-400'>Apresentadora</li>
            <li className='hover:text-amber-400'>Apresentador</li>
            <li className='hover:text-amber-400'>Atleta</li>
            <li className='hover:text-amber-400'>Ator</li>
            <li className='hover:text-amber-400'>Atriz</li>
            <li className='hover:text-amber-400'>Celebridade</li>
            <li className='hover:text-amber-400'>Comediante</li>
            <li className='hover:text-amber-400'>DJ</li>
            <li className='hover:text-amber-400'>Contor</li>
            <li className='hover:text-amber-400'>Contora</li>
          </ul>
        </div>

        {/* <div className='z-10 xl:hidden block fixed bottom-10 lg:right-36 sm:right-20 right-8 h-10 w-10 rounded-lg bg-amber-400'>
          <HiAdjustmentsHorizontal className='h-full w-full p-2' />
        </div> */}
        <ArtistsGrid searchedArtist={artistData} />
      </div>

    </section>
  )
}

export default Page