import {gql} from "apollo-server-express"

const mutation = gql`
    type Mutation {
        _empty : String
    }
`

export default mutation
export {default as user} from "./user"
export {default as course} from "./course"