import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import { ApolloServer, makeExecutableSchema } from "apollo-server-express"
import { importSchema } from "graphql-import"
import resolvers from "./resolvers"
import cookieParser from "cookie-parser"
import { HasRoleDirective } from "./directives"
import depthLimit from "graphql-depth-limit"

mongoose.connect(process.env.DATABASE_PROTOCOL + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME, {
    useNewUrlParser: true,
    useCreateIndex: true
})

const app = express()
app.use(cookieParser())

const typeDefs = importSchema(`${__dirname}/typeDefs/schema.graphql`)
const schemas = makeExecutableSchema({
    typeDefs,
    resolvers,
    directiveResolvers: {
        hasRole: HasRoleDirective
    }
})

const apolloServer = new ApolloServer({
    schema: schemas,
    context: ({req, res}) => {
        return {
            request: req,
            response: res
        }
    },
    engine: false,
    playground: {
        settings: {
            "request.credentials": "include"
        }
    },
    validationRules: [ depthLimit(10) ]
})
apolloServer.applyMiddleware({app, path: "/"})

app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running at localhost:${process.env.PORT || 5000}`)
})