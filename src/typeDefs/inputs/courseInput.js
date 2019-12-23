import {gql} from "apollo-server-express"

const courseInput = gql`
    input CourseInput {
        id: String!
        title: String!
        description: String
    }
`

export default courseInput