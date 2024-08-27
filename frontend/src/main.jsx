import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import { AuthContextProvider } from './context/AuthContext'
import { CharacterContextProvider } from './context/CharacterContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <CharacterContextProvider>
        <App />
      </CharacterContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
