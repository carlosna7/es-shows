import ArtistsSwiper from '@/components/artists/ArtistsSwiper'
import Link from 'next/link'

export default function Home() {

  return (
    <section>
      <div className="flex flex-col justify-between items-center h-full 2xl:px-72 xl:px-52 lg:px-36 p-0 py-16 gap-16" id="background-image">

        <h1 className="lg:text-4xl md:text-3xl text-xl text-center font-bold text-white">MAIS DE <span className="text-amber-400">1000 ARTISTAS</span> AO SEU ALCANCE!</h1>

        <ArtistsSwiper />

        <Link className="py-2 px-4 relative flex items-center justify-center overflow-hidden font-semibold transition duration-300 ease-out border-2 border-amber-400 group" href="/artistas">
          <span className="absolute flex items-center justify-center w-full h-full text-amber-400 bg-transparent duration-300 -translate-x-full group-hover:translate-x-0">VEJA MAIS ARTISTAS</span>
          <span className="absolute flex items-center justify-center w-full h-full text-black bg-amber-400 transition-all duration-300 transform group-hover:translate-x-full ease">VEJA MAIS ARTISTAS</span>
          <span className="relative invisible">VEJA MAIS ARTISTAS</span>
        </Link>
      </div>
    </section>
  )
}

