import Link from 'next/link'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"

export default function Home() {

  return (
    <section>
      <div className="flex flex-col justify-between items-center h-full 2xl:px-72 xl:px-52 lg:px-36 p-0 py-16 gap-16" id="background-image">

        <h1 className="lg:text-4xl md:text-3xl text-xl text-center font-bold text-white">MAIS DE <span className="text-amber-400">1000 ARTISTAS</span> AO SEU ALCANCE!</h1>

        <div className="flex w-full justify-between items-center gap-8">
          <FaAngleLeft className='text-white text-5xl' />
          <div className="xl:w-[250px] xl:h-[250px] md:w-[210px] md:h-[210px] sm:w-[150px] sm:h-[150px] w-[350px] h-[250px] ">
            <img
              className='w-full h-full'
              src='/foto-1.jpg'
            />
          </div>
          <div className="xl:w-[250px] xl:h-[250px] md:w-[210px] md:h-[210px] sm:w-[150px] sm:h-[150px] sm:block hidden">
            <img
              className='w-full h-full'
              src='/foto-2.jpg'
            />
          </div>
          <div className="xl:w-[250px] xl:h-[250px] md:w-[210px] md:h-[210px] sm:w-[150px] sm:h-[150px] sm:block hidden">
            <img
              className='w-full h-full'
              src='/foto-3.jpg'
            />
          </div>

          <FaAngleRight className='text-white text-5xl' />
        </div>

        <Link className='bg-amber-400 font-bold p-2' href="/artistas">VEJA MAIS ARTISTAS</Link>
      </div>
    </section>
  )
}
