import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { tokenPlugin } from './config';

const superagent = superagentPromise(_superagent, global.Promise);
const API_URL = "https://conduit.productionready.io/api";


export const requests = {
    del: url =>
        superagent.del(`${API_URL}${url}`).use(tokenPlugin).then(handleResponse),
    get: url =>
        superagent.get(`${API_URL}${url}`).use(tokenPlugin).then(handleResponse),
    put: (url, body) =>
        superagent.put(`${API_URL}${url}`, body).use(tokenPlugin).then(handleResponse),
    post: (url, body) =>
        superagent.post(`${API_URL}${url}`, body).use(tokenPlugin).then(handleResponse)
};


const handleResponse = res => res.body;
