import React from "react";
import { List, Datagrid, TextField, Filter, TextInput } from 'admin-on-rest';

const ProfessionFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn />
    </Filter>
);

export const ProfessionList = (props) => {
    return (
        <List title="All professions" filters={<ProfessionFilter />} {...props} >
            <Datagrid>
                <OldSchoolMenuLink label="#" style={{cursor: 'pointer'}} {...props}/>
                <TextField source="id"/>
                <TextField source="name"/>
            </Datagrid>
        </List>
    );
};

function OldSchoolMenuLink({label, history, record}) {
    return (
        <div className={"active"} onClick={() => {
            history.push({
                pathname: `/chapters/list?professionId=${record.id}`,
            });
        }}>
            {label}
        </div>
    );
}

