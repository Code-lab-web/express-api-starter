import { useState } from "react"
import { useEffect } from "react"
import { StrictMode } from 'react'
import { Container, Typography } from "@mui/material";
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

// Removed duplicate declaration of App component
export const App = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      console.log('scrolled!');
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
    useEffect(() => {
      const controller = new AbortController();
  
  fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', { signal: controller.signal })
    .then(response => response.json())
    .then(data => console.log(data));
  
  const intervalId = setInterval(() => {
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', { signal: controller.signal })
      .then(response => response.json())
      .then(data => console.log(data));
  
    console.log('This runs every second');
  }, 1000);
  
    return () => {
      clearInterval(intervalId);
      controller.abort();
    };
  }, []);
    return (
      <div>
        <button onClick={() => setCount(count + 1)}>
          Increase count
        </button>
        <button onClick={() => setCount(count - 1)}>
          Decrease count
        </button>
        <button
          onClick={() => setCount(0)}
          disabled={count === 0}>
          Reset
        </button>
        <button onClick={() => setCount(count * 2)}>
          Multiply
        </button>
  
        <p>Count: {count}</p>
        {count > 140 && <p>You hit 140!</p>}
      </div>
    );
  };
  