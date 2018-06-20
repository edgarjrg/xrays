import * as Koa from 'koa';
import * as koaRouter from 'koa-router';
import * as koaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,

} from 'graphql';

import { db } from "../../sequelize";

const Repository = new GraphQLObjectType({
  name: 'Repository',
  fields: {
    id: {
      type: GraphQLInt
    },
    projectKey: {
      type: GraphQLString
    },
    repoSlug: {
      type: GraphQLString
    },
    userName: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
  }
})

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'root',
    fields: {
      repositories: {
        type: new GraphQLList(Repository),
        resolve(obj, args, { db }) {
          return db.models.Repository
            .findAll()
        }
      }
    }
  })
});

const app = new Koa();
const router = new koaRouter();
const PORT = 3000;

const graphqlServer = graphqlKoa({
  schema,
  context: {
    db: db()
  }
})


router.post('/graphql', koaBody(), graphqlServer);
router.get('/graphql', graphqlServer);

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});