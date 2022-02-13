import { MOCK_JOB_DATA } from '../util/mock';

const initialState = {
    loading: false,
    jobs: MOCK_JOB_DATA
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}