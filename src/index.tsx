import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import { App } from './App';
import '../sass/index.sass'
import { Provider,connect } from 'react-redux'
import { setupStore } from './store'

const rootDom = document.getElementById('root');
if ( rootDom ) {
  const root = createRoot(rootDom);
  root.render(
    <Provider store={setupStore} >
      <App />
    </Provider>);
}
