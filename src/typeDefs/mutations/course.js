import {gql} from "apollo-server-express"

const mutation = gql`
    input CourseInput {
        id: String!
        title: String
        description: String
    }

    extend type Mutation {
        createCourse(course: CourseInput!) : Course
    }
`

export default mutation