import { fetchUtils } from 'admin-on-rest';
import { TEST } from '../local';
import uuid from "uuid/v1";

const API_URL = TEST.API.URL;
let instance = null;
const {fetchJson} = fetchUtils;

export class ServerService {

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    remote(name, params = {}) {
        const sid = localStorage.getItem('sid');
        const requestId = uuid();
        const data = {requestId, params: Object.assign({sessionId: sid}, params), name: name};
        let url = `${API_URL}/rpc?name=${data.name}`;
        let options = {
            method: 'POST',
            body: JSON.stringify(data),
        };
        return fetchJson(url, options)
            .then(response => {
                if (response.json.code === 200) {
                    return Promise.resolve(response.json);
                }
                return Promise.reject(response.json.message);
            })
            .catch((error) => Promise.reject(error));
    }
}
