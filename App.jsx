import { Header } from "./components/Header"
import { ThoughtForm } from "./components/ThoughtForm"
import { ThoughtList } from "./components/ThoughtList"

import "./App.css"

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