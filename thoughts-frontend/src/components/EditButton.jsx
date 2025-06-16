export const EditButton = ({ id }) => {

    const handleEdit = async (event) => {
      event.preventDefault()
  
      try {
        const response = await fetch(`http://localhost:8080/thought/${id}`)
        const thought = await response.json()
  
        const newName = prompt("Edit the thought name:", thought.name)
        if (!newName) return
  
        const updateResponse = await fetch(`http://localhost:8080/thought/${id}`, {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: newName })
        })
  
        if (!updateResponse.ok) {
          throw new Error("Failed to update thought")
        }
  
        alert("thought updated!");
      } catch (err) {
        console.error("Error editing thought:", err)
      }
    }
  
    return (
      <button onClick={handleEdit}></button>
    )
  }
