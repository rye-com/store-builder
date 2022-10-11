import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Basic ${process.env.REACT_APP_GRAPHQL_KEY}`,
  },
});

export function GraphQLProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
