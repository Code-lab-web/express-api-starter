import { Header } from "./Header"
import { ThoughtForm } from "./ThoughtForm"
import { ThoughtList } from "./ThoughtList"
import { ColorFilter } from "./ColorFilter"
import { ThoughtGrid } from "./ThoughtGrid"
import "./Card.css";
import "./index.css";
import "./App.css"

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