import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Header } from "./Header"
import { ThoughtForm } from "./ThoughtForm"
import { ThoughtList } from "./ThoughtList"
import { ColorFilter } from "./ColorFilter"
import { ThoughtGrid } from "./ThoughtGrid"
import "./Card.css";
import "./index.css";

import App from './App.jsx'
import "./App.css"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export const App = () => { 
  return (
    <>
      <Header />
      <main>
        <ThoughtForm />
        <ThoughtList />
      </main>
    </>
  )
}