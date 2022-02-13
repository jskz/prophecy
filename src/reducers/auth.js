const initialState = {
    loading: false,
    authenticated: false,
    token: null
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authenticated: true,
                token: 'EXAMPLE-TOKEN'
            };

        default:
            return state;
    }
};