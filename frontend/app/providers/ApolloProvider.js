import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: `${NEXT_PUBLIC_API_THE_GRAPH}`,
  cache: new InMemoryCache(),
});

export const MyApolloProvider = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);