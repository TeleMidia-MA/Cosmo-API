import query, {user as userQuery, course as courseQuery} from "./querys"
import mutation, {user as userMutation, course as courseMutation} from "./mutations"
import {userType, courseType} from "./types"
import rolesEnum from "./enum/rolesEnum"

const typeDefs = [
    rolesEnum,
    query,
    userQuery, userType,
    courseQuery, courseType,
    mutation,
    userMutation,
    courseMutation
]

export default typeDefs