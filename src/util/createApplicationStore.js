import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const createApplicationStore = () => createStore(reducer, applyMiddleware(thunk));

export default createApplicationStore;