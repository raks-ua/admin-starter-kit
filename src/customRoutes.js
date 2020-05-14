import React from 'react';
import { Route } from 'react-router-dom';
import {AppList} from './resources/apps';

export default [
    <Route exact path="/app/list" component={AppList} />,
    /*<Route exact path="/baz" component={Baz} noLayout />,
*/];