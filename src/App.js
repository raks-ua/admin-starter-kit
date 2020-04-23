import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
import { createBrowserHistory } from 'history';
import myApiRestClient from './restclient';
import Dashboard from './dashboard';
import authClient from './authClient';
import { UserList } from "./getAllUsers";
import Menu from './Menu';
import i18nProvider from './i18nProvider';

var originalLog = console.error;
console.error = function log(...args) {
    if (args.length > 0 && typeof args[0] === "string" && /^Warning: Missing translation/.test(args[0])) {
        return
    }
    originalLog.apply(console, args)
};

const history = createBrowserHistory();

const App = (props) => (
    <Admin locale="ru" messages={i18nProvider} authClient={authClient} restClient={myApiRestClient} dashboard={Dashboard} history={history} menu={Menu}>
        <Resource name="users" list={UserList}/>
    </Admin>
);

export default App;
