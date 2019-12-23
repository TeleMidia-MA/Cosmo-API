import query, {course} from "./query"
import mutation from "./mutation"
import {userType, courseType} from "./types"
import {userInput, courseInput} from "./inputs"
import rolesEnum from "./enum/rolesEnum"

const typeDefs = [
    rolesEnum,
    query, userType,
    course, courseType,
    mutation, userInput, courseInput
]

export default typeDefs