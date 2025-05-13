import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import CharacterDetails from './pages/CharacterDetails.tsx';
import { matchRoutes } from 'react-router';
import { initializeFaro, createReactRouterV6DataOptions, ReactIntegration, getWebInstrumentations, withFaroRouterInstrumentation } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

initializeFaro({
  url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/e6e1f753af4bccc8adc1482786cadde9',
  app: {
    name: 'react-rick',
    version: '1.0.0',
    environment: 'production',
  },
  instrumentations: [
    ...getWebInstrumentations(),
    new TracingInstrumentation(),
    new ReactIntegration({
      router: createReactRouterV6DataOptions({
        matchRoutes,
      }),
    }),
  ],
});

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:characterId',
    element: <CharacterDetails />,
  },
]);

const browserRouter = withFaroRouterInstrumentation(router);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={browserRouter} />
    </ApolloProvider>
  </StrictMode>
);
