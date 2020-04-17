import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';

export const TeacherList = (props) => (
    <List title="All teachers" /*to="/getTeachers"*/ {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="firstName" />
        </Datagrid>
    </List>
);
