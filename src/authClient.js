import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS} from 'admin-on-rest';
import {MICROSERVICE} from './local';
import uuid from "uuid/v1";

export let userPermissionsService;

export default (type, params) => {

    if (type === AUTH_LOGIN) {
        const {username, password} = params;
        let requestId = uuid();
        const request = new Request(MICROSERVICE.API + '/login', {
            method: 'POST',
            body: JSON.stringify({
                name: 'loginUsername',
                "params": {username, password}, requestId
            }),
            headers: new Headers({'Content-Type': 'application/json'}),
        });

        return fetch(request)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log('ERROR', result);
                    if (result.code < 200 || result.code >= 300) {
                        throw new Error(result.message);
                    }
                    return result.data.sessionId;
                }
            )
            .then(
                (sid) => {
                    console.log('SID', sid);
                    localStorage.setItem('sid', sid);
                    localStorage.setItem('role', 'admin');
                }
            )
        // .catch(
        //     (error) => {
        //         console.log('ERR', error);
        //     }
        // )
        // .then(response => {
        //     //console.log('RESPONSE', response.json());
        //     if (response.status < 200 || response.status >= 300) {
        //         throw new Error(response.statusText);
        //     }
        //     return response.json();
        // })
        // .then((token) => {
        //     console.log(token);
        //     /*
        //     const decodedToken = decodeJwt(token);
        //     localStorage.setItem('token', token);
        //     localStorage.setItem('role', decodedToken.role);
        //
        //      */
        // });
    }
    if (type === AUTH_LOGOUT) {
        console.log('AUTHLOGOUT', params);
        localStorage.removeItem('sid');
        localStorage.removeItem('lang');
        localStorage.removeItem('appId');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const status = params.message.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('sid');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        let sid;
       // return Promise.resolve('12');
        if (window.location.search !== '') {
            const urlParams = new URLSearchParams(window.location.search);
            sid = urlParams.get('sid');
        } else {
            sid = localStorage.getItem('sid');
        }
        const request = new Request(MICROSERVICE.API + '/session/touch', {
            method: 'POST',
            body: JSON.stringify({
                sid: sid,
            }),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return fetch(request)
            .then(response => response.json())
            .then((result) => {
                    console.log('ERROR', result);
                    if (result.code < 200 || result.code >= 300) {
                        return Promise.reject();
                    }
                    if (result.data.userId) {
                        localStorage.setItem('appId', result.data.userId)};
                    return Promise.resolve(result.data.sid)
                }
            )

    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    }

    return Promise.reject('Unknown method');
}
;

export function withActions(wrapperActions) {
    console.log(wrapperActions)
}
