import query, {auth as authQuery, course as courseQuery} from "./querys"
import mutation, {auth as authMutation, course as courseMutation} from "./mutations"
import {userType, courseType} from "./types"
import {userInput, courseInput} from "./inputs"
import rolesEnum from "./enum/rolesEnum"

const typeDefs = [
    rolesEnum,
    query,
    authQuery, userType,
    courseQuery, courseType,
    mutation,
    authMutation, userInput,
    courseMutation, courseInput
]

export default typeDefs