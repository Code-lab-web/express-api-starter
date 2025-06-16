export const Thought = ({ id, message, likes }) => {
    return (
      <div className="thought">
        <p>{message}</p>
        <p>Likes: {likes}</p>
        <button onClick={() => console.log("Remove thought")}>Delete</button>
        <button onClick={() => console.log("Like thought")}>Like</button>
      </div>
    )
  }