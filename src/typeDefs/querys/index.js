import {gql} from "apollo-server-express"

const query = gql`
    type Query {
        _empty : String
    }
`

export default query
export {default as user} from "./user"
export {default as course} from "./course"