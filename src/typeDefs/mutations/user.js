import {gql} from "apollo-server-express"

const mutation = gql`
    input UserInput {
        email: String!
        password: String!
        role: Roles
    }

    extend type Mutation {
        register(user: UserInput!) : User
        enrollment(user: ID!, course: String!) : Course
    }
`

export default mutation