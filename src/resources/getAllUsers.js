import React from 'react';
import { userPermissionsService } from '../authClient';
import { List, Datagrid, TextField, Filter, TextInput, SelectInput } from 'admin-on-rest';
import { translate } from "../i18nProvider";

const UniqueSelectInput = ({uniqueList, ...props}) => {
    const { choices, source } = props;
    let choices_unique = [];
    if (choices && source && !uniqueList) {
        const choices_unique_list = choices
            .map(item => item[source])
            .filter((value, index, self) => self.indexOf(value) === index);
        choices_unique = choices_unique_list.map((item, i) => {
            return { name: item.title, id: item.value };
        });
    } else {
        choices_unique = uniqueList.map((item, i) => {
            return { name: item.title, id: item.value };
        });
    }
    return (
        <SelectInput {...props} choices={choices_unique}/>
    );
};

const UserFilter = (props) => (
    <Filter {...props}>
      <TextInput label={translate('list.name')} source="name" />
      <UniqueSelectInput
          label={translate('resources.users.fields.permission')}
          source="permission"
          uniqueList={userPermissionsService?.userPermissions} {...props} allowEmpty/>
    </Filter>
);

export const UserList = (props) => (
    <List title={translate('resources.users.nameAll')} filters={<UserFilter />} perPage={25} {...props} sort={{ field: 'name', order: 'ASC' }}>

        <Datagrid>
            <TextField label="#" source="num"/>
            <TextField label={translate('resources.users.fields.id')}  source="id"/>
            <TextField label={translate('resources.users.fields.en')} source="en"/>
            <TextField label={translate('resources.users.fields.login')} source="login"/>
            <TextField label={translate('resources.users.fields.name')} source="name"/>
            <TextField label={translate('resources.users.fields.permission')} source="permission"/>
            {/*<TextField label={translate('resources.users.fields.action')} />*/}
        </Datagrid>
    </List>
);

