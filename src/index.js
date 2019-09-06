import "dotenv/config"
import express from "express"
import {ApolloServer} from "apollo-server-express"
import typeDefs from "./typeDefs"
import resolvers from "./resolvers"
import mongoose from "mongoose"

mongoose.connect(process.env.DATABASE_PROTOCOL + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME, {
    useNewUrlParser: true,
    useCreateIndex: true
})
const app = express()
const apolloServer = new ApolloServer({typeDefs, resolvers})
apolloServer.applyMiddleware({app, path: "/graphql"})

app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running at localhost:${process.env.PORT || 5000}`)
})