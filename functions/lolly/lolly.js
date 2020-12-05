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
    getLolly: [Lolly!]
 }
 type Mutation {
    createLolly(To: String!, message: String!, from: String!, flavourTop: String!,flavourMiddle: String!,flavourBottom: String!,url: String!): Lolly
 }
`


const resolvers = {
  Query: {
    getLolly: async () => {
      try{
        var client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
        var result = await client.query(
            q.Map(q.Paginate(q.Match(q.Index("all_Lolly"))),q.Lambda("X", q.Get(q.Var("X"))))
          );
        console.log(result.data)
        return result.data.map(a => {
            return {
                id: a.ts,
                To: a.data.To,
                message: a.data.message,
                from: a.data.from,
                flavourBottom: a.data.flavourBottom, 
                flavourTop: a.data.flavourTop,
                flavourMiddle: a.data.flavourMiddle,
                url: a.data.url 
            }
        })
        
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