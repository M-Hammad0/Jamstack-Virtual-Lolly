require("dotenv").config();
const {ApolloServer,gql}  = require('apollo-server-lambda')
const faunadb = require('faunadb'),
q = faunadb.query;

const typeDefs = gql`
  
type Lolly {
    To: String!
    message: String!
    from: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    url: String!
 }
 
 type Query {
    getLolly(url: String!): Lolly
 }
 type Mutation {
    createLolly(To: String!, message: String!, from: String!, flavourTop: String!,flavourMiddle: String!,flavourBottom: String!,url: String!): Lolly
 }
`


const resolvers = {
  Query: {
    getLolly: async (_,{url}) => {
      try{
        var client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
        var result = await client.query(
            q.Get(q.Match(q.Index("lolly_by_url"),url))
          );
        console.log(result)
        return result.data
      }
      catch(err){
        console.log('err',err);
      }
    }
  },
  Mutation: {
    createLolly: async (_, { To,from,message,flavourTop,flavourMiddle,flavourBottom,url }) => {
      try {
        var client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
        var result = await client.query(
          q.Create(
            q.Collection('Lolly'),
            {
              data: {
                To,
                message,
                from,
                flavourTop,
                flavourMiddle,
                flavourBottom,
                url
              }
            }
          )

        );
        console.log(result.data);
        return result.data

      }
      catch (error) {
        console.log('Error: ');
        console.log(error);
      }

    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()