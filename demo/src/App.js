import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

import './App.css'

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
        </ThemeProvider>
      </header>
    </div>
  )
}

export default App
