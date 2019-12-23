import {gql} from "apollo-server-express"

const courseType = gql`
    type Course {
        id: String
        title: String
        description: String
    }
`

export default courseType