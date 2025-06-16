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
import { Form } from "./Form";
import { Card } from "./Card";
import { Index } from "./Index";
import { Css } from "./Css";
import { Animation } from "./Animation";

import App from '../../../../../App.js'
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