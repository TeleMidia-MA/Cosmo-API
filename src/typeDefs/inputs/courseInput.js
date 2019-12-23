import {gql} from "apollo-server-express"

const courseInput = gql`
    input CourseInput {
        title: String
        description: String
    }
`

export default courseInput