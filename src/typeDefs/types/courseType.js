import {gql} from "apollo-server-express"

const courseType = gql`
    type Course {
        id: ID!
        title: String
        description: String
    }
`

export default courseType