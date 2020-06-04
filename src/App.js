import React from 'react';
import {Admin, Resource} from 'admin-on-rest';
import {createBrowserHistory} from 'history';
import myApiRestClient from './restclient';
import Dashboard from './dashboard';
import authClient from './authClient';
import {UserList} from "./resources/getAllUsers";
import {AppList, AppEdit, AppCreate, AppDelete, AppIcon} from "./resources/apps";
import {
    MessageTemplateCreate,
    MessageTemplateDelete,
    MessageTemplateEdit,
    MessageTemplateList
} from "./resources/messageTemplates";
import Menu from './Menu';
import i18nProvider from './i18nProvider';
import { APP} from './local';


var originalLog = console.error;
console.error = function log(...args) {
    if (args.length > 0 && typeof args[0] === "string" && /^Warning: Missing translation/.test(args[0])) {
        return
    }
    originalLog.apply(console, args)
};

const history = createBrowserHistory();

const App = (props) => (
    <Admin locale="ru"
           messages={i18nProvider}
           authClient={authClient}
           restClient={myApiRestClient}
           dashboard={Dashboard}
           history={history}
           menu={Menu}
          title={APP.NAME}
           icon={AppIcon}
    >
      {/*  <Resource name="admin_users" list={UserList}/>
        <Resource name="apps" list={AppList} edit={AppEdit} create={AppCreate} remove={AppDelete}/>*/}
        <Resource name="message_templates" list={MessageTemplateList} edit={MessageTemplateEdit} create={MessageTemplateCreate} remove={MessageTemplateDelete}/>

    </Admin>
);

export default App;
