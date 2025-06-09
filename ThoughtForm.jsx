
import { useState } from "react"
import { useThoughtStore } from "../stores/useThoughtStore"

export const ThoughtForm = () => {
  const [message, setMessage] = useState("")
  const createThought = useThoughtStore(state => state.createThought)

  const handleSubmit = e => {
    e.preventDefault()
    createThought(message)
    setMessage("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message" />
      <button type="submit">Send</button>
    </form>
  )
}