import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

/*
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  fetchOptions: {
    mode: 'cors' as const,
  },
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    const fetchOptions: RequestInit = {
      ...init,
      credentials: 'include' as const,
      mode: 'cors' as const,
    };

    return fetch(input, fetchOptions);
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});*/
