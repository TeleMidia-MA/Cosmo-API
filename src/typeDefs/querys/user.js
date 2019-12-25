import {gql} from "apollo-server-express"

const query = gql`
    extend type Query {
        user(email: String!) : User
        login(email: String!, password: String!) : String
    }
`

export default query