import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import { AuthProvider } from '@/context/authContext'
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Es Shows",
}

export default function RootLayout({ children }) {
  return (

    <AuthProvider>
      <html lang="pt-br">
        <body className={inter.className}>
          <Navbar/>
            {children}
          <Footer/>
        </body>
      </html>
    </AuthProvider>

  )
}
