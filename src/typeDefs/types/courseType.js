import {gql} from "apollo-server-express"

const courseType = gql`
    type Course {
        id: String
        title: String
        description: String
        participants: [User]
    }
`

export default courseType