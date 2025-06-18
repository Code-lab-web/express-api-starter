import { useThoughtStore } from "../stores/useThoughtStore"
import { Thought } from "./Thought"

export const ThoughtList = () => {
  const thoughts = useThoughtStore(state => state.thoughts)

  if (thoughts.length === 0) return <p>No thoughts yet. Be the first!</p>

  return (
    <>
      {thoughts.map(thought => (
        <Thought key={thought.id} {...thought} />
      ))}
    </>
  )
}