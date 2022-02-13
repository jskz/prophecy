import { MOCK_PROJECT_DATA } from '../util/mock';

const initialState = {
    loading: false,
    projects: MOCK_PROJECT_DATA
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}