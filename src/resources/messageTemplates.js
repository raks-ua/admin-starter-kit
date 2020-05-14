import {
    List,
    Datagrid,
    TextField,
    DateField,
    Filter,
    SelectInput,
    ReferenceInput,
    ReferenceField,
    Edit,
    SimpleForm, TextInput, Create, Delete, EditButton, DeleteButton, LongTextInput
} from 'admin-on-rest';
import React from 'react'
import {translate} from "../i18nProvider";
import {locales, message_types} from '../constants/message_templates'

const LanguageFilter = (props) => (
    <Filter {...props}>
        <SelectInput label={translate('resources.messageTemplates.fields.language')} title="language" allowEmpty
                     alwaysOn choices={locales} source="language"/>
        <SelectInput label={translate('resources.messageTemplates.fields.type')} title="type" allowEmpty alwaysOn
                     choices={message_types} source="type"/>
        <ReferenceInput  label={translate('resources.apps.fields.name')} source="id" reference="apps" alwaysOn perPage={25}>
            <SelectInput optionText="name" allowEmpty/>
        </ReferenceInput>
    </Filter>
);

export const MessageTemplateList = (props) => (
    <List title="All message templates" perPage={25} filters={<LanguageFilter/>} {...props} >
        <Datagrid bodyOptions={{stripedRows: true, showRowHover: true}}>
            <TextField label={translate('resources.messageTemplates.fields.id')} source="id"/>
            <TextField label={translate('resources.messageTemplates.fields.key')} source="key"/>
            <TextField label={translate('resources.messageTemplates.fields.template')} source="template"/>
            <TextField label={translate('resources.messageTemplates.fields.data')} source="data"/>
            <TextField label={translate('resources.messageTemplates.fields.language')} source="language"/>
            <ReferenceField label={translate('resources.messageTemplates.fields.app')} source="app_id" reference="apps">
                <TextField source="name"/>
            </ReferenceField>
            <DateField label={translate('resources.messageTemplates.fields.created')} source="created"/>
            <EditButton label={translate('simple.buttons.editButton')}/>
            <DeleteButton label={translate('simple.buttons.deleteButton')}/>
        </Datagrid>

    </List>
);

const MessageTemplateEditTitle = ({record}) =>
    <span>{translate('simple.action.edit')}&nbsp;
        {translate('resources.messageTemplates.name')}&nbsp;
        {record ? `"${record.name}"` : ''}
    </span>;

export const MessageTemplateEdit = (props) => (
    <Edit title={<MessageTemplateEditTitle/>} {...props}>
        <SimpleForm>
            <ReferenceInput label={translate('resources.messageTemplates.fields.app')} source="app_id" reference="apps">
                <SelectInput label={translate('resources.messageTemplates.fields.app_id')} source="name"/>
            </ReferenceInput>
            <TextInput label={translate('resources.messageTemplates.fields.key')} source="key"/>
            <SelectInput label={translate('resources.messageTemplates.fields.language')} choices={locales}/>
            <SelectInput label={translate('resources.messageTemplates.fields.type')} choices={message_types}/>
            <LongTextInput label={translate('resources.messageTemplates.fields.template')} source="template"/>
            <LongTextInput label={translate('resources.messageTemplates.fields.data')} source="data"/>
        </SimpleForm>
    </Edit>
);

export const MessageTemplateCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label={translate('resources.messageTemplates.fields.app')} source="app_id" reference="apps">
                <SelectInput label={translate('resources.messageTemplates.fields.app_id')} source="name"/>
            </ReferenceInput>
            <TextInput label={translate('resources.messageTemplates.fields.key')} source="key"/>
            <SelectInput label={translate('resources.messageTemplates.fields.language')} choices={locales}/>
            <SelectInput label={translate('resources.messageTemplates.fields.type')} choices={message_types}/>
            <LongTextInput label={translate('resources.messageTemplates.fields.template')} source="template"/>
            <LongTextInput label={translate('resources.messageTemplates.fields.data')} source="data"/>
        </SimpleForm>
    </Create>
);

const MessageTemplateDeleteTitle = ({record}) => <span>
    {translate('resources.messageTemplates.delete')}&nbsp;
    {record && `${record.name}`}
</span>;

export const MessageTemplateDelete = (props) => <Delete {...props} title={<MessageTemplateDeleteTitle/>}/>;