import {gql} from "apollo-server-express"

const query = gql`
    type Query {
        login(email: String!, password: String!) : String
    }
`

export default query