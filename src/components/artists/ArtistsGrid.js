'use client'

import { AuthContext } from '@/context/authContext'
import Link from 'next/link'
import React, { Suspense, useContext, useEffect, useState } from 'react'

const ArtistsGrid = ({ searchedArtist }) => {
  const { spotifyToken } = useContext(AuthContext)
  const [counter, setCounter] = useState(9)
  const [artistsId, setArtistsId] = useState([])
  const [artistsData, setArtistsData] = useState([])

  useEffect(() => {

    if (!spotifyToken) {
      return
    }

    // requisição apra capturar os albums mais recentes lançados, pois assim vou poder capturar varios cantores e exibilos em um grid (já que no spotify não posso ter os artistas mais famosos)
    fetch(`https://api.spotify.com/v1/browse/new-releases`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + spotifyToken
      },
    })
      .then((response) => response.json())
      .then((data) => {

        // transforma todos os albums em um unico array, após isso concatena os valores de cada artista de cada album em um unico array
        const allArtistsData = data.albums.items.reduce((acc, album) => {
          return acc.concat(album.artists)
        }, [])

        // faz novamente o mesmo método, porém agora reservando apenas os ids de cada artista no array
        const allArtistsId = allArtistsData.reduce((acc, ids) => {
          return acc.concat(ids.id)
        }, [])

        setArtistsId(allArtistsId)
      })
      .catch((erro) => {
        console.log(erro)
      })
  }, [spotifyToken])

  // Selecioinar os dados completos de todos os artistas a partir do ID pego antes
  const getAllArtists = () => {
    fetch(`https://api.spotify.com/v1/artists?ids=${artistsId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + spotifyToken
      },
    })
      .then((response) => response.json())
      .then((data) => {

        const artistas = filterUniqueArtists(data.artists)

        setArtistsData(artistas)

      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  // função para identificar duplicidade de ID
  const filterUniqueArtists = (artists) => {
    const uniqueArtistsMap = new Map()

    artists.forEach((artist) => {
      uniqueArtistsMap.set(artist.id, artist)
    })

    return Array.from(uniqueArtistsMap.values())
  }

  // para evitar bug na requisição esse useEffect só chama a função do grid de artistas quando o array de IDs estiver cheio
  useEffect(() => {
    if (artistsId.length > 0) {
      getAllArtists()
    }
  }, [artistsId])

  const incrementCounter = () => {
    setCounter(counter + 6)
  }

  return (
    <section className='w-full'>
      <Suspense fallback={<p>carregando</p>}>
        <div className='grid md:grid-cols-3 grid-cols-2 2xl:gap-8 gap-4 justify-items-center'>
          {/* Artista pesquisado inserido no grid */}
          {searchedArtist && (
            <div className='flex flex-col justify-end w-full lg:h-[350px] sm:h-[300px] h-[240px] p-4 rounded-xl relative hover:scale-95 duration-300' key={searchedArtist.id} style={{ backgroundImage: `url(${searchedArtist.images[0].url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div className="absolute inset-0 rounded-xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></div>
              <Link href={`/artistas/${searchedArtist.id}`} className="z-10 flex flex-col gap-4">
                <p className='lg:text-3xl sm:text-2xl text-xl font-bold text-white'>{searchedArtist.name}</p>
                <p className='text-xs bg-amber-400 rounded-sm text-center font-bold sm:w-1/2 w-full'>{searchedArtist.genres[0]}</p>
              </Link>
            </div>
          )}
          {/* lista de artistas */}
          {artistsData.slice(0, counter).map(artist => (
            <div className='flex flex-col justify-end w-full lg:h-[350px] sm:h-[300px] h-[240px] p-4 rounded-xl relative hover:scale-95 duration-300' key={artist.id} style={{ backgroundImage: `url(${artist.images[0].url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              <div className="absolute inset-0 rounded-xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}></div>
              <Link href={`/artistas/${artist.id}`} className="z-10 flex flex-col gap-4">
                <p className='lg:text-3xl sm:text-2xl text-xl font-bold text-white'>{artist.name}</p>
                <p className='text-xs bg-amber-400 rounded-sm text-center font-bold sm:w-1/2 w-full'>{artist.genres[0]}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className='flex justify-center md:pt-16 pt-8'>
          <button onClick={incrementCounter} className='p-2 rounded-md bg-white'>Ver mais</button>
        </div>
      </Suspense>

    </section>
  )
}

export default ArtistsGrid