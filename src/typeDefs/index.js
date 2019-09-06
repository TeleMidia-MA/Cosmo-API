import query from "./query"
import mutation from "./mutation"
import {userType} from "./types"
import {userInput} from "./inputs"

const typeDefs = [query, userType, mutation, userInput]

export default typeDefs