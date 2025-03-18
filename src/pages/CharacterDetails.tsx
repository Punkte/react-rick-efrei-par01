import { useQuery } from "@apollo/client"
import { graphql } from "../gql"
import { useParams } from "react-router"

const GET_CHARACTER = graphql(`
query GetCharacter($id: ID!) {
	character(id: $id) {
    id
    name
    image
    status
    species
    gender
  }
}
`)

const CharacterDetails = () => {
  const params = useParams()
  console.log(params.characterId)
  const {data, error, loading} = useQuery(GET_CHARACTER, {variables: {id: params.characterId!}})

  if(!data?.character || loading) {
    return <>loading</>
  }

  const character = data.character

  if (error) return <>error</>
  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.image ?? ''} />
      <p>{character.status}</p>
      <p>{character.species}</p>
      <p>{character.gender}</p>
    </div>
  )
}

export default CharacterDetails