'use strict';
/*global window: false*/
/*global document: false*/

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import IsomorphicRelay from 'isomorphic-relay';

import Newsfeed from './components/Newsfeed';
import AppHomeRoute from './routes/AppHomeRoute';

const environment = new Relay.Environment();
environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));

const data = JSON.parse(document.getElementById('preloadedData').textContent);
const rootElement = document.getElementById('root');

const rootContainerProps = {
  Container: Newsfeed,
  queryConfig: new AppHomeRoute(),
};

IsomorphicRelay.injectPreparedData(environment, rootContainerProps, data)
  .then(props => {
    ReactDOM.render(<IsomorphicRelay.Renderer {...props} />, rootElement);
  });

