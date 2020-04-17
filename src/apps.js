import {List, Datagrid, TextField, DateField, Filter, TextInput, SelectInput} from 'admin-on-rest';
import React from 'react'

const options = [
    {name: 'chocolate', id: 'Chocolate'},
    {name: 'strawberry', id: 'Strawberry'},
    {name: 'vanilla', id: 'Vanilla'},
];

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="App Id" title="app_id" alwaysOn source="app_id"/>
        <SelectInput label="SelectName" title="SelectName" choices={options} source="name"/>

    </Filter>
);

export const AppList = (props) => (
    <List title="All apps" perPage={25} filters={<PostFilter/>} {...props} >
        <Datagrid bodyOptions={{stripedRows: true, showRowHover: true}}>
            <TextField source="id"/>
            <TextField source="app_id"/>
            <TextField source="name"/>
            <DateField source="created"/>
        </Datagrid>

    </List>
);