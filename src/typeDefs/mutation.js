import {gql} from "apollo-server-express"

const mutation = gql`
    type Mutation {
        register(user: UserInput) : User
    }
`

export default mutation