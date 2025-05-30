import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchThoughts = () => {
    setLoading(true)
    fetch("http://localhost:8080/thoughts")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok')
      })
      .then(data => {
        setThoughts(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchThoughts()
  }, [])

  const handleClick = () => {
    setLoading(true)
    fetch("http://localhost:8080/thought?color=red")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok')
      })
      .then(data => {
        setThoughts(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (loading) {
    return <p>LOADING...</p>
  }

  return (
    <>
      <h1>Happy Thoughts!</h1>
      <button onClick={handleClick}>Get red thought</button>
      {thoughts.length && thoughts.map(thought => <p>{thought.name} - {thought.color}</p>)}
    </>
  )
}

export default App