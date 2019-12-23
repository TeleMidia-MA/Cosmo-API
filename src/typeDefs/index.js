import query, {course as courseQuery} from "./querys"
import mutation, {course as courseMutation} from "./mutations"
import {userType, courseType} from "./types"
import {userInput, courseInput} from "./inputs"
import rolesEnum from "./enum/rolesEnum"

const typeDefs = [
    rolesEnum,
    query, userType,
    courseQuery, courseType,
    mutation, userInput,
    courseMutation, courseInput
]

export default typeDefs