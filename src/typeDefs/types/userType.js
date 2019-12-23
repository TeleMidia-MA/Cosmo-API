import {gql} from "apollo-server-express"

const userType = gql`
    type User {
        id: ID!
        email: String
        password: String,
        role: Roles
    }
`

export default userType