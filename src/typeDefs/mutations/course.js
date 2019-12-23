import {gql} from "apollo-server-express"

const mutation = gql`
    extend type Mutation {
        createCourse(course: CourseInput) : Course
    }
`

export default mutation