import { useState, useEffect } from 'react'
import Header from './components/header'
import GamesList from './components/GamesList'
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [globalNumber, setGlobalNumber] = useState(0)
  const gameIds = [19539512, 21483333, 14420998, 16784936,20102048, 9825]
  const randomUser = () => Math.floor(Math.random() * 9)
  useEffect(() =>{
      setGlobalNumber(randomUser())
  },[])

  return (
    <main className='bg-gray-600 w-dvw h-dvh'>
      <Analytics/>
      <Header globalNumber={globalNumber}/>
      <GamesList globalNumber={globalNumber} gameIds={gameIds}/>
    </main>
  )
}

export default App
