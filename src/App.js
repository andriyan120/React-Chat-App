import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'; 


import { initiateContacts } from './redux/actions/ContactsActions';
import { initiateMessages } from './redux/actions/MessagesActions';
import configureStore from './configureStore';

import './App.scss'
import Sidebar from './containers/Sidebar';
import MainWindow from './containers/MainWindow';

import contacts from './samples/contacts';
import messages from './samples/messages';


const store = configureStore()
store.dispatch(initiateContacts(contacts));
store.dispatch(initiateMessages(messages));


function App() {
  return (
	  <Provider store={store}>
		<Router>
			  <div className='app'>
				  <Sidebar />
				  <MainWindow />
			</div>
		</Router>
	  </Provider>
  );
}

export default App;
