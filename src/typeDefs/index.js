import query from "./query"
import mutation from "./mutation"
import {userType, courseType} from "./types"
import {userInput, courseInput} from "./inputs"
import rolesEnum from "./enum/rolesEnum";

const typeDefs = [
    rolesEnum,
    query, userType, courseType,
    mutation, userInput, courseInput
]

export default typeDefs