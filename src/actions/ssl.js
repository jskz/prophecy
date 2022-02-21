import { SSL_DOMAINS_LOADED } from "./types";

const GET_SSL_DOMAINS_ENDPOINT = `https://3cptqvrexe.execute-api.us-east-1.amazonaws.com/default/getDomains`;

export const loadSSLDomains = () => async (dispatch) => {
    const resp = await fetch(GET_SSL_DOMAINS_ENDPOINT, {
        headers: {

            'Content-Type': 'application/json'
        }
    });
    const json = await resp.json();

    dispatch({
        type: SSL_DOMAINS_LOADED, payload: json
    });
};