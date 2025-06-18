import { create } from "zustand"

const initialState = {
  thoughts: [
    {
      id: 1,
      message: "My first message from the store",
      likes: 0
    }
  ]
}


export const useThoughtStore = create((set) => ({
  ...initialState,
  createThought: (message) => {
    const newThought = {
      id: Date.now(),
      message,
      likes: 0
    }

    set(state => ({ thoughts: [newThought, ...state.thoughts] }))
  }
}))