import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/50153/block369/version/latest',
  cache: new InMemoryCache(),
});

export const MyApolloProvider = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);