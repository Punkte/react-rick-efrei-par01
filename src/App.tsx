import {useQuery } from "@apollo/client"
import { graphql } from "./gql"
import { Link } from "react-router"

const GET_CHARACTERS = graphql(`
query GetCharacters($page: Int) {
  characters(page: $page) {
    info {
      next
      prev
    }
    results {
      id
      name
      image
    }
  }
}
`)


function App() {
  const {data, error, loading, refetch} = useQuery(GET_CHARACTERS)

  if(!data || loading) {
    return <>loading</>
  }

  if (error) return <>error</>

  return (
    <>
    {data.characters?.info?.prev && <button onClick={() => refetch({page: data.characters?.info?.prev})}>Page précédente</button>}
    {data.characters?.info?.next && <button onClick={() => refetch({page: data.characters?.info?.next})}>Page suivante</button>}
    <ul>
      {(data.characters?.results ?? [])
        .filter(el => el !== null)
        .map(character => {
          return <Link to={character.id!} key={character.id}>
            <li>
              <img src={character.image ?? ''} />
              {character.name}
            </li>
          </Link>
        })}
    </ul>
    </>
  )
}

export default App
