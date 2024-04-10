'use client'

import React, { createContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

// auqi saberemmos se o token de login esta ativo, pois sem ele estar o contexto fara com que o usuario seja deslogador e precise fazer login novamente

const AuthProvider = ({ children }) => {
  const [spotifyToken, setSpotifyToken] = useState('')

  const path = usePathname()

  const userData = localStorage.getItem("userToken")

  const [ userId, setUserId] = useState('')

  useEffect(() => {
    const clientId = "752bc423ead34d0e866844e838f72e4e"
    const clientSecret = "9b8005642b884d28bfba120b16ca9941"

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    })
      .then((response) => response.json())
      .then((data) => {

        setSpotifyToken(data.access_token)

      })
      .catch((erro) => {
        console.log(erro)
      })

    // Função para verificar se o token expirou
    const checkToken = async () => {
      try {
        const response = await fetch(`http://localhost:5000/verify-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: userData })
        })
        const data = await response.json()

        if (data.expired) {
          console.log("token expirou!")
          localStorage.removeItem('userToken')
          setUserId(false)

        } else {
          const validToken = jwtDecode(userData)
          setUserId(validToken.userId)
          console.log("token ainda é valido!")
        }
      } catch (error) {
        console.error('Erro ao verificar a expiração do token:', error)
      }
    }

    checkToken()
  }, [path, userData])

  return (
    <AuthContext.Provider value={{ spotifyToken, userId }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }