'use client'

import { AuthContext } from '@/context/authContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const RelatedArtists = () => {
  const { spotifyToken } = useContext(AuthContext)
  const path = usePathname()
  const id = path.replace('/artistas/', '')
  const [relatedArtists, setRelatedArtists] = useState([])

  useEffect(() => {
    getRelatedArtists()
  }, [])

  const getRelatedArtists = () => {
    fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + spotifyToken
      },
    })
      .then((response) => response.json())
      .then((data) => {

        setRelatedArtists(data.artists)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  return (
    <div className='2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 md:py-16 py-8 flex flex-col gap-8'>

      <h2 className='text-2xl font-bold text-white text-center'>Artistas Relacionados</h2>

      <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 justify-items-center'>
        {relatedArtists.slice(0, 4).map(artist => (
          <div className='flex flex-col justify-end w-full lg:h-[350px] sm:h-[300px] h-[240px] p-4 rounded-xl relative hover:scale-95 duration-300' key={artist.id} style={{ backgroundImage: `url(${artist.images[0].url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="absolute inset-0 rounded-xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></div>

            <Link href={`/artistas/${artist.id}`}className="z-10 flex flex-col gap-4">
              <p className='lg:text-3xl sm:text-2xl text-xl font-bold text-white'>{artist.name}</p>
              <p className='text-xs bg-amber-400 rounded-sm text-center font-bold sm:w-1/2 w-full'>{artist.genres[0]}</p>
            </Link>
          </div>
        ))}
      </div>

    </div>
  )
}

export default RelatedArtists