import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'
import {ThemeProvider as NextThemesProvider} from "next-themes";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
