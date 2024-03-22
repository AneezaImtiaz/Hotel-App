import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const BASE_URL = 'https://graphql.contentful.com/content/v1/spaces/gyfunrv4a4ak/environments/master';

const httpLink = createHttpLink({
  uri: BASE_URL,
  headers: {
    Authorization: `Bearer k9P9FQJcUpHKrHX3tXrgXunRyiS3qPchtY7V61tNruE`,
  },
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
