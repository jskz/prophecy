import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { ApolloProvider } from '@apollo/client';
import { InMemoryCache } from "apollo-cache-inmemory";

import App from './App';

import createStore from './util/createApplicationStore';

import './index.css';

const store = createStore();

const url = process.env.REACT_APP_GRAPHQL_ENDPOINT;
const region = process.env.REACT_APP_APPSYNC_REGION;
const auth = {
    type: process.env.REACT_APP_APPSYNC_AUTH_TYPE,
    apiKey: process.env.REACT_APP_APPSYNC_API_KEY
};

const httpLink = createHttpLink({ uri: url });

const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);