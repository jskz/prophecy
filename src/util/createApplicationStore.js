import { createStore } from 'redux';

import reducer from '../reducers';

const createApplicationStore = () => createStore(reducer);

export default createApplicationStore;