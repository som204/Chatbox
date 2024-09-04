import { useState } from 'react'

import './App.css'
import ChatBox from './Component/ChatBox'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
      <ChatBox/>
   </div>
  )
}

export default App
