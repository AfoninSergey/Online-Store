import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { OnlineStore } from './online-store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<OnlineStore />
		</BrowserRouter>
	</Provider>,
);
