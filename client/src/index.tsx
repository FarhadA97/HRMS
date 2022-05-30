import React, { StrictMode } from 'react';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    
  </StrictMode>
);

