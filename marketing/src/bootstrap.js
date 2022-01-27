import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (element, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(
    <App history={history} />,
    element,
  )

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const element = document.getElementById('_marketing-dev-root');
  
  if (element) {
    mount(element, { 
      defaultHistory: createBrowserHistory() 
    });
  }
}

export { mount }