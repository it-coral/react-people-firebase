import 'styles/app.scss';

import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { App } from 'components';
import LoginForm  from './components/pages/LoginForm';
import SignUpForm  from './components/pages/SignUpForm';
import Dashboard  from './components/pages/dashboard';

const routes = (
  <Router>
      <div>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/home" component={Dashboard} />
      </div>
  </Router>
);

const outlet = document.getElementById('app')

const render = () => {
  ReactDOM.render(
    <AppContainer>
      {routes}
    </AppContainer>,
    outlet
  );
};

render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(render);
}
