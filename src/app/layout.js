import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { AuthProvider } from '@/context/authContext'
import { MsgProvider } from "@/context/msgContext"
import Message from "@/components/layout/Message"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Es Shows",
}

export default function RootLayout({ children }) {
  return (

    <AuthProvider>
      <MsgProvider>
        <html lang="pt-br">
          <body className={inter.className}>
            <Navbar />
            <Message />
              {children}
            <Footer />
          </body>
        </html>
      </MsgProvider>
    </AuthProvider>

  )
}
