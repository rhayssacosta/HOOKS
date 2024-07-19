import { useState, useEffect } from "react"
import { Table, Spinner } from "react-bootstrap"
import axios from "axios"

function App() {
  const [character, setCharacter] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://rickandmortyapi.com/api/character")
        setCharacter(response.data.results)
        setLoading(false)
      } catch (error) {
        console.log(`o erro foi ${error}`)
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  if (loading) {
    return <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
  }

  return (
    <>
      <div className="container">
        <h2>Characters</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Species</th>
            </tr>
          </thead>
          <tbody>
            {character.map(character => 
              <tr key={character.id}>
                <td>{character.name}</td>
                <td>{character.species}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default App
