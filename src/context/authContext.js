'use client'

import React, { createContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

// aqui saberemos se o token de login esta ativo, pois sem ele estar ativo o contexto fara com que o usuario seja deslogado e precise fazer login novamente

const AuthProvider = ({ children }) => {
  const [spotifyToken, setSpotifyToken] = useState('')
  const [userId, setUserId] = useState('')

  const path = usePathname()

  useEffect(() => {
    const fetchData = async () => {
      const clientId = "752bc423ead34d0e866844e838f72e4e"
      const clientSecret = "9b8005642b884d28bfba120b16ca9941"

      const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
      })

      const tokenData = await tokenResponse.json()

      setSpotifyToken(tokenData.access_token)

      // Verifica se o codigo esta sendo executado no navegador antes de acessar o localStorage para evitar erros
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("userToken")

        if (userData) {
          try {
            const response = await fetch(`https://api-esshow.onrender.com/verify-token`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ token: userData })
            })
            const data = await response.json()

            if (data.expired) {

              console.log("Token expirou!")
              localStorage.removeItem('userToken')
              setUserId(false)

            } else {

              const validToken = jwtDecode(userData)
              setUserId(validToken.userId)
              console.log("Token ainda é válido!")

            }
          } catch (error) {
            console.error('Erro ao verificar a expiração do token:', error)
          }
        }
      }
    }

    fetchData()
  }, [path])

  return (
    <AuthContext.Provider value={{ spotifyToken, userId }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }