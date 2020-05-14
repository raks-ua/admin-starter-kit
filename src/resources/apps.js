import {
    List, Datagrid, TextField, DateField, Filter, TextInput, SelectInput,
    Edit,
    EditButton,
    DeleteButton,
    SimpleForm,
    Create,
    ReferenceInput,
    Delete

} from 'admin-on-rest';
import React from 'react'
import {translate} from "../i18nProvider";
import ApproveButton from "../buttons/Approve";
//import EditButton from "../buttons/Edit";
//import DeleteButton from "../buttons/Delete";

const AppIdFilter = (props) => (
    <Filter {...props}>
        <TextInput label={translate('resources.apps.fields.app_id')} title="app_id" source="app_id" alwaysOn/>
        <ReferenceInput label={translate('resources.apps.fields.name')} source="id" reference="apps" alwaysOn  perPage={25}>
            <SelectInput optionText="name" allowEmpty/>
        </ReferenceInput>
    </Filter>
);

export const AppList = (props) => (
    <List title={translate('resources.apps.nameAll')} perPage={25} filters={<AppIdFilter/>} {...props} >
        <Datagrid bodyOptions={{stripedRows: true, showRowHover: true}}>
            <TextField label={translate('resources.apps.fields.id')} source="id"/>
            <TextField label={translate('resources.apps.fields.app_id')} source="app_id"/>
            <TextField label={translate('resources.apps.fields.name')} source="name"/>
            <DateField label={translate('resources.apps.fields.created')} source="created"/>
            <ApproveButton label={translate('simple.action.approve')}style={{padding: 0}}/>
            <EditButton  label={translate('simple.buttons.editButton')}/>
            <DeleteButton  label={translate('simple.buttons.deleteButton')}/>
        </Datagrid>
    </List>
);

const AppEditTitle = ({record}) =>
    <span>{translate('simple.action.edit')}&nbsp;
        {translate('resources.apps.name')}&nbsp;
        {record ? `"${record.name}"` : ''}
    </span>;

export const AppEdit = (props) => (
    <Edit title={<AppEditTitle/>} {...props}>
        <SimpleForm>
            <TextInput label={translate('resources.apps.fields.name')} source="name"/>
        </SimpleForm>
    </Edit>
);

export const AppCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label={translate('resources.apps.fields.name')} source="name"/>
            <TextInput label={translate('resources.apps.fields.app_id')} source="app_id"/>
        </SimpleForm>
    </Create>
);

const AppDeleteTitle = ({record}) => <span>
    {translate('resources.apps.delete')}&nbsp;
    {record && `${record.name}`}
</span>;

export const AppDelete = (props) => <Delete {...props} title={<AppDeleteTitle/>}/>;