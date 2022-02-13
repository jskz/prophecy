import { combineReducers } from 'redux';

import auth from './auth';
import jobs from './jobs';
import projects from './projects';
import resources from './resources';

export default combineReducers({ auth, jobs, projects, resources });