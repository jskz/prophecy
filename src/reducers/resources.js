import { MOCK_RESOURCE_DATA } from '../util/mock';

const initialState = {
    loading: false,
    resources: MOCK_RESOURCE_DATA
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}