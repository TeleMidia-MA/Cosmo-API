import {gql} from "apollo-server-express"

const rolesEnum = gql`
    enum Roles {
        user
        administrator
        teacher
    }
`

export default rolesEnum