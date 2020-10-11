import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App/App';
import { store } from './Store';
import { initWithEndpoint} from './Services/networkProvider';

initWithEndpoint('http://localhost:8080');

// create('goods',{
//   category: 'drink',
//   title: 'Cola',
//   weight: '2',
//   description:'----'
// }).then(() => {
//   get('goods')
// })

// remove('goods', 'f13c612d-3885-4b2a-af0f-457d3ab082db').then(() => {
//   get('goods')
// })

// update('goods', '7a3d5bb0-7916-4a25-a516-225fb5bc18f7', {
//   title: 'Title After Update',
//   description: 'Description After Update',
//   weight: '123'
// }).then(() => {
//   get('goods')
// })

// updateItem('56e3d78b-6f27-49cf-8392-e2e7383e5a85', {
//   title: 'Title After Update',
//   description: 'Description After Update',
//   weight: '123'
// }).then(() => {
//   get('goods')
// })

// updateMerg('goods', 'a1432446-70b8-4e84-bf17-02b6dc366fda', {
//   title: 'Title After UpdateMerg',
// }).then(() => {
//   get('goods')
// })

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

