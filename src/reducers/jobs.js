import { MOCK_JOB_DATA } from '../util/mock';

import {
    CLOSE_EDIT_JOB_MODAL,
    EDIT_JOB,
    JOB_UPDATED,
    SET_EDITING_JOB_NAME,
    SET_EDITING_JOB_PROJECT_IDS,
    SET_EDITING_JOB_RESOURCE_IDS
 } from '../actions/types';

const initialState = {
    loading: false,
    jobs: MOCK_JOB_DATA,

    editJobModalOpen: false,
    editingJob: {},

    createJobModalOpen: false,
    creatingJob: {
        name: 'My New Job',
    }
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case JOB_UPDATED:
            {
                const { id, job } = action.payload;
                const index = state.jobs.findIndex(job => job.id === id);

                return {
                    ...state,
                    jobs: [
                        ...state.jobs.slice(0, index),
                        job.job,
                        ...state.jobs.slice(index + 1)
                    ]
                };
            }

        case EDIT_JOB:
            return {
                ...state,

                editJobModalOpen: true,
                editingJob: action.payload
            };

        case SET_EDITING_JOB_NAME:
            return {
                ...state,
                editingJob: {
                    ...state.editingJob,
                    name: action.payload
                }
            };

        case SET_EDITING_JOB_PROJECT_IDS:
            return {
                ...state,
                editingJob: {
                    ...state.editingJob,
                    project_ids: action.payload
                }
            };

        case SET_EDITING_JOB_RESOURCE_IDS:
            return {
                ...state,
                editingJob: {
                    ...state.editingJob,
                    resource_ids: action.payload
                }
            };

        case CLOSE_EDIT_JOB_MODAL:
            return {
                ...state,

                editJobModalOpen: false,
            };

        default:
            return state;
    }
}