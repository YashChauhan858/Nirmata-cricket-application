import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
/** --------------- @Pages ---------------------- */
import { Home, PlayerDetails } from '@Pages'

function App() {
  return (
    <div className="flex h-full bg-primary">
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player-details" element={<PlayerDetails />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
