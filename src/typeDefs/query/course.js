import {gql} from "apollo-server-express"

const query = gql`
    extend type Query {
        course(id: String!) : Course
    }
`

export default query