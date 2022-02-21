import { LOAD_SSL_DOMAINS, SSL_DOMAINS_LOADED } from "../actions/types";

const initialState = {
    loading: false,
    domains: []
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_SSL_DOMAINS:
            return {
                ...state,
                loading: true
            };

        case SSL_DOMAINS_LOADED:
            return {
                ...state,
                loading: false,
                domains: action.payload
            };

        default:
            return state;
    }
}