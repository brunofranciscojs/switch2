import { useState, useEffect } from 'react'
import Header from './components/header'
import GamesList from './components/GamesList'

function App() {
  const [globalNumber, setGlobalNumber] = useState(0)

  const randomUser = () => Math.floor(Math.random() * 9)
  useEffect(() =>{
      setGlobalNumber(randomUser())
  },[])

  return (
    <main className='bg-gray-600 w-dvw h-dvh'>
      <Header globalNumber={globalNumber}/>
      <GamesList globalNumber={globalNumber}/>
    </main>
  )
}

export default App
