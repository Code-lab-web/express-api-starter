import { useState } from "react"
import { useEffect } from "react"
import { StrictMode } from 'react'

import { Container, Typography } from "@mui/material";

import { createRoot } from 'react-dom/client'
import { Header } from "./Header"
import { ThoughtForm } from "./ThoughtForm"
import { ThoughtList } from "./ThoughtList"
import { ColorFilter } from "./ColorFilter"
import { ThoughtGrid } from "./ThoughtGrid"
import { LoadingSpinner } from "./LoadingSpinner";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { EditButton } from "./EditButton"
import "./Card.css";
import "./index.css";
import "./App.css"

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