export const Header = () => {
    return (
      <header className="dark">
        <p>Happy thoughts: 0</p>
        <button onClick={()=> console.log("Remove all")}>Remove all</button>
        <button onClick={() => console.log("Reset to initial state")}>Reset</button>
      </header>
    )
  }