import { useState, useEffect } from 'react'
import Header from './components/header'
import GamesList from './components/GamesList'
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [globalNumber, setGlobalNumber] = useState(0)
  const gameIds = [19539512, 198271, 39102048, 28920, 21483333, 58271,14420998, 16784936, 9825, 29387221]
  const randomUser = () => Math.floor(Math.random() * 9)
  useEffect(() =>{
      setGlobalNumber(randomUser())
  },[])

  return (
    <main className='bg-gray-600 w-full h-screen'>
      <Analytics/>
      <Header globalNumber={globalNumber}/>
      <GamesList globalNumber={globalNumber} />
    </main>
  )
}

export default App
