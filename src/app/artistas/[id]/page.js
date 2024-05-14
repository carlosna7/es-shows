'use client'

import { useParams, useRouter } from 'next/navigation'
import { AuthContext } from '@/context/authContext'
import React, { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import uf from '@/components/json/uf'
import RelatedArtists from '@/components/artists/RelatedArtists'
import { MsgContext } from '@/context/msgContext'

const Page = () => {

  const { spotifyToken, userId } = useContext(AuthContext)
  const [artistData, setArtistData] = useState([])
  const [image, setImage] = useState('')
  const { id } = useParams()
  const estados = uf.UF
  const route = useRouter()
  const { handleMessage } = useContext(MsgContext)

  if (userId === false) {
    route.push("/login")
  }

  const [formData, setFormData] = useState({
    artist: '',
    image: '',
    cache: '',
    date: new Date(),
    estado: '',
    cidade: '',
  })

  // requisição para obter os dados do artista selecionado (segundo o ID do link)
  useEffect(() => {
    fetch(`https://api.spotify.com/v1/artists/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + spotifyToken
      },
    })
      .then((response) => response.json())
      .then((data) => {

        setArtistData(data)
        setImage(data.images[0].url)
        setFormData({ ...formData, artist: data.name })

      })
      .catch((erro) => {
        console.log(erro)
      })
  }, [])

  const handleInputChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value, image: image })
  }

  // submit do formulário para API adicionando os dados da contratação do show ao bando de dados 
  const handleSubmit = (ev) => {
    ev.preventDefault()
    const updateData = formData

    fetch(`https://api-esshow.onrender.com/user/shows/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shows: updateData }),
    })
      .then((response) => response.json())
      .then((data) => {

        if(data.msg) {
          handleMessage(data.msg)
          route.push('/contratacoes')
        }
        if(data.error) {
          handleMessage(data.error)
        }

      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  return (
    <div id="background-image">
      <section className='flex md:flex-row flex-col 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 md:py-16 py-8 gap-8'>

        <div className='flex justify-center md:w-2/3 w-full md:h-auto sm:h-[400px] h-[280px]'>
          <div className='flex items-end lg:w-2/3 w-full h-full rounded-xl relative hover:scale-95 duration-300' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <p className='text-white text-4xl font-bold p-4'>{artistData.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-10 bg-white rounded-xl xl:w-1/3 md:w-1/2'>

          <div className='md:text-xl text-lg text-center font-bold rounded-t-xl p-6 bg-amber-400'>
            <p>Preencha os campos abaixo e solicite seu orçamento.</p>
          </div>

          <div className='flex flex-col px-8 gap-6'>

            <select name="cache" onChange={handleInputChange} className='bg-gray-100 p-2 rounded-lg'>
              <option value="">Cachê:</option>
              <option value="10000">10.000,00</option>
              <option value="25000">25.000,00</option>
              <option value="50000">50.000,00</option>
              <option value="100000">100.000,00</option>
            </select>

            <DatePicker
              className='bg-gray-100 p-2 rounded-lg w-full'
              selected={formData.date}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setFormData({ ...formData, date: date })}
            />

            <select name="estado" onChange={handleInputChange} className='bg-gray-100 p-2 rounded-lg'>
              {estados.map((estado, index) => (
                <option key={index} value={estado.nome}>{estado.nome}</option>
              ))}
            </select>

            <input type='text' name="cidade" placeholder='Digite sua cidade...' onChange={handleInputChange} className='bg-gray-100 p-2 rounded-lg' />

          </div>

          <div className='flex justify-center rounded-b-xl p-8 pt-0'>
            <button type="submit" className="py-2 px-4 relative flex items-center justify-center overflow-hidden font-semibold transition duration-300 ease-out border-2 border-amber-400 group">
              <span className="absolute flex items-center justify-center w-full h-full text-amber-400 bg-transparent duration-300 -translate-x-full group-hover:translate-x-0">ENVIAR ORÇAMENTO</span>
              <span className="absolute flex items-center justify-center w-full h-full text-black bg-amber-400 transition-all duration-300 transform group-hover:translate-x-full ease">ENVIAR ORÇAMENTO</span>
              <span className="relative invisible">ENVIAR ORÇAMENTO</span>
            </button>
          </div>
        </form>

      </section>   

      <RelatedArtists />
    </div>
  )
}

export default Page