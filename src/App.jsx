import { useState } from 'react'
import News from './components/news/News.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <News />
    </>
  )
}

export default App
