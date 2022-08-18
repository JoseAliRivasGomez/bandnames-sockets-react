import React from 'react'
import { SocketProvider } from './context/SocketProvider'
import HomePage from './pages/HomePage'

export const App = () => {
  return (
    <SocketProvider>
        <HomePage />
    </SocketProvider>
  )
}
