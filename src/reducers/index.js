import { combineReducers } from 'redux';

import auth from './auth';
import jobs from './jobs';
import projects from './projects';
import resources from './resources';
import ssl from './ssl';

export default combineReducers({ auth, jobs, projects, resources, ssl });