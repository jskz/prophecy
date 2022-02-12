import { combineReducers } from 'redux';

import auth from './auth';
import jobs from './jobs';
import resources from './resources';

export default combineReducers({ auth, jobs, resources });