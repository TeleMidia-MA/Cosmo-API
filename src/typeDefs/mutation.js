import {gql} from "apollo-server-express"

const mutation = gql`
    type Mutation {
        register(user: UserInput) : User
        
        createCourse(course: CourseInput) : Course
    }
`

export default mutation