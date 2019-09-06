import {gql} from "apollo-server-express"

const userInput = gql`
    input UserInput {
        email: String!
        password: String!
    }
`

export default userInput