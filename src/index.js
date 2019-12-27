import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import {ApolloServer} from "apollo-server-express"
import { importSchema } from "graphql-import"
import resolvers from "./resolvers"
import cookieParser from "cookie-parser"

mongoose.connect(process.env.DATABASE_PROTOCOL + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME, {
    useNewUrlParser: true,
    useCreateIndex: true
})

const app = express()
app.use(cookieParser())

const typeDefs = importSchema(`${__dirname}/typeDefs/schema.graphql`)

const apolloServer = new ApolloServer({
    typeDefs: [typeDefs],
    resolvers,
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
    }
})
apolloServer.applyMiddleware({app, path: "/"})

app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running at localhost:${process.env.PORT || 5000}`)
})