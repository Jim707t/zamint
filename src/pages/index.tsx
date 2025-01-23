import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Gallery from '../components/Gallery'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zamint Story</title>
        <meta name="description" content="Zamint Order ideals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link 
        href="/techno-afunism"
        className="fixed top-4 right-4 z-50 px-6 py-2 bg-red-600/20 hover:bg-red-600/40 backdrop-blur-sm border border-red-500/20 rounded-full text-white transition-all duration-300 hover:scale-105"
      >
        Introduction to Techno-Afunism
      </Link>

      <main className="min-h-screen bg-gray-100">
        <Gallery />
      </main>
    </div>
  )
}

export default Home