import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='z-10 2xl:px-72 xl:px-52 lg:px-36 sm:px-20 px-8 sm:py-16 py-8 bg-zinc-900 text-white flex flex-col gap-8'>

      <div className='md:grid hidden grid-cols-4 items-center lg:text-base text-sm'>
        <ul>
          <li className='font-bold lg:text-lg text-base'>CONTATO</li>
          <li>(11)1234-5678</li>
        </ul>
        <ul>
          <li className='font-bold lg:text-lg text-base'>E-MAIL</li>
          <li>es@shows.com</li>
        </ul>
        <ul>
          <li className='font-bold lg:text-lg text-base'>ATENDIMENTO</li>
          <li>7h às 17h</li>
        </ul>
        <div>
          <div className='flex justify-center lg:gap-4 gap-2 lg:text-2xl text-lg'>
            <div className='rounded-full md:p-2 p-1 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white duration-300'>
              <FaFacebookF />
            </div>
            <div className='rounded-full md:p-2 p-1 border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white duration-300'>
              <FaTwitter />
            </div>
            <div className='rounded-full md:p-2 p-1 border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white duration-300'>
              <FaInstagram />
            </div>
            <div className='rounded-full md:p-2 p-1 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300'>
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>

      <div className='md:grid hidden grid-cols-4'>
        <ul>
          <li className='font-bold lg:text-lg text-base'>ARTISTA</li>
          <li>Apresentador</li>
          <li>Apresentadora</li>
          <li>Ator</li>
          <li>Atriz</li>
          <li>Atleta</li>
          <li>Celebridade</li>
        </ul>
        <ul>
          <li className='font-bold lg:text-lg text-base'>SHOW</li>
          <li>Comediante</li>
          <li>DJ</li>
          <li>Cantor</li>
          <li>Cantora</li>
          <li>Infantil</li>
        </ul>
        <ul>
          <li className='font-bold lg:text-lg text-base'>SERVIÇOS</li>
          <li>Corporativo</li>
          <li>Particular</li>
        </ul>
        <ul>
          <li className='font-bold lg:text-lg text-base'>PORTFÓLIO DE EVENTOS</li>
          <li>Novidades</li>
          <li>Galeria de fotos</li>
          <li>Contato</li>
        </ul>
      </div>

      <div className='md:hidden font-bold lg:text-lg text-base'>
        <ul className='flex flex-col gap-4 pb-8'>
          <li>CONTATO</li>
          <li>ATENDIMENTO</li>
          <li>ARTISTA</li>
          <li>SHOW</li>
          <li>SERVIÇOS</li>
          <li>PORTFÓLIO</li>
        </ul>
        <div>
          <div className='flex justify-center lg:gap-4 md:gap-2 gap-4 lg:text-2xl md:text-lg text-2xl'>
            <div className='rounded-full p-2 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white'>
              <FaFacebookF />
            </div>
            <div className='rounded-full p-2 border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white'>
              <FaTwitter />
            </div>
            <div className='rounded-full p-2 border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'>
              <FaInstagram />
            </div>
            <div className='rounded-full p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'>
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center'>
        <p>Desenvolvido por Carlos</p>
      </div>
    </div>
  )
}

export default Footer