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
    SimpleForm, TextInput, Create, Delete, EditButton, DeleteButton, LongTextInput, RichTextField, FunctionField
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
        {/*   <ReferenceInput  label={translate('resources.apps.fields.name')} source="id" reference="app" alwaysOn sort={{ field: 'name', order: 'ASC' }}>
            <SelectInput optionText="name" allowEmpty />
        </ReferenceInput>*/}
    </Filter>
);

export const MessageTemplateList = (props) => {

    return (
        <List title="All message templates" perPage={25} filters={<LanguageFilter/>}
              filter={{app_id: localStorage.getItem('appId')}}  {...props} >
            <Datagrid bodyOptions={{stripedRows: true, showRowHover: true}}>
                <TextField label={translate('resources.messageTemplates.fields.id')} source="id"/>
                <TextField label={translate('resources.messageTemplates.fields.key')} source="key"/>
                <TextField label={translate('resources.messageTemplates.fields.template')} source="template"/>
                <TextField label={translate('resources.messageTemplates.fields.type')} source="type"/>
                <TextField label={translate('resources.messageTemplates.fields.language')} source="language"/>
                {/*  <ReferenceField label={translate('resources.messageTemplates.fields.app')} source="app_id" reference="apps">
                <TextField source="name"/>
            </ReferenceField>*/}
                <FunctionField label={translate('resources.messageTemplates.fields.data')}
                               render={record => isJSON(record.data) ? <pre>{print_r(JSON.parse(record.data))}</pre> :
                                   <pre>{record.data}</pre>} source="data"/>
                <DateField label={translate('resources.messageTemplates.fields.created')} source="created"/>
                <EditButton label={translate('simple.buttons.editButton')}/>
                <DeleteButton label={translate('simple.buttons.deleteButton')}/>
            </Datagrid>

        </List>
    )
};

const MessageTemplateEditTitle = ({record}) =>
    <span>{translate('simple.action.edit')}&nbsp;
        {translate('resources.messageTemplates.name')}&nbsp;
        {record ? `"${record.key}"` : ''}
    </span>;

export const MessageTemplateEdit = (props) => (
    <Edit title={<MessageTemplateEditTitle/>} {...props}>
        <SimpleForm>
            <ReferenceInput label={translate('resources.messageTemplates.fields.app')} source="app_id" reference="apps">
                <SelectInput label={translate('resources.messageTemplates.fields.app_id')} source="name"/>
            </ReferenceInput>
            <TextInput label={translate('resources.messageTemplates.fields.key')} source="key"/>
            <SelectInput label={translate('resources.messageTemplates.fields.language')} source="language"
                         choices={locales}/>
            <SelectInput label={translate('resources.messageTemplates.fields.type')} source="type"
                         choices={message_types}/>
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
    {translate('simple.buttons.deleteButton')}&nbsp;
    {record && `${record.key}`}
</span>;

function isJSON(text) {
    if (typeof text !== "string") {
        return false;
    }
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

function print_r(array, return_val) {
    var output = "", pad_char = " ", pad_val = 4;

    var formatArray = function (obj, cur_depth, pad_val, pad_char) {
        if (cur_depth > 0)
            cur_depth++;

        var base_pad = repeat_char(pad_val * cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
        var str = "";

        if (typeof obj == 'object' || typeof obj == 'array' || (obj.length > 0 && typeof obj != 'string' && typeof obj != 'number')) {
            if (!(typeof obj == 'object' || typeof obj == 'array')) str = '\n' + obj.toString() + '\n';
            str += '[\n';//"Array\n" + base_pad + "(\n";
            for (var key in obj) {
                if (typeof obj[key] == 'object' || typeof obj[key] == 'array' || (obj.length > 0 && typeof obj != 'string' && typeof obj != 'number')) {
                    str += thick_pad + "" + key + ": " + ((!(typeof obj == 'object' || typeof obj == 'array')) ? '\n' + obj[key] + '\n' : '') + formatArray(obj[key], cur_depth + 1, pad_val, pad_char) + '\n';
                } else {
                    str += thick_pad + "" + key + ": " + obj[key] + "\n";
                }
            }
            str += base_pad + " ]\n";
        } else {
            str = obj.toString();
        }
        ;

        return str;
    };

    var repeat_char = function (len, char) {
        var str = "";
        for (var i = 0; i < len; i++) {
            str += char;
        }
        return str;
    };

    output = formatArray(array, 0, pad_val, pad_char);
    return output;
}

export const MessageTemplateDelete = (props) => <Delete {...props} title={<MessageTemplateDeleteTitle/>}/>;