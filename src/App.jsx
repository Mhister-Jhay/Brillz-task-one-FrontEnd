import React from 'react'
import Registration from './Components/Registration/Registration'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import VerifyToken from './Components/VerifyToken/VerifyToken'


function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/registration'  element={<Registration/>}/>
        <Route path='/verify-token'  element={<VerifyToken/>}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App