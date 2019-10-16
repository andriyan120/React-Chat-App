import { combineReducers, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import windowReducer from './redux/reducers/windowReducer';
import contactsReducer from './redux/reducers/contactsReducer';
import messagesReducer from './redux/reducers/messagesReducer';
import openedMessageReducer from './redux/reducers/openedMessageReducer';


const reducers = combineReducers({
    window: windowReducer,
    contacts: contactsReducer,
    messages: messagesReducer,
    openedMessage: openedMessageReducer
})

const middlewares = []

if(process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewares.push(logger)
}

const configureStore = () => createStore(
    reducers,
    applyMiddleware(...middlewares)
);

export default configureStore;