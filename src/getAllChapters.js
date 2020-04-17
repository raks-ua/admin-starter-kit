import React from "react";
import { List, Datagrid, TextField, Filter, TextInput } from 'admin-on-rest';
import { Button } from '@material-ui/core';
import { translate } from "./i18nProvider";

const ChapterFilter = (props) => (
    <Filter {...props}>
        <TextInput label={translate('list.search')} source="name" alwaysOn />
    </Filter>
);
// {props.match.params.id ? 'Profession Chapters' : "All chapters"}
export const ChapterList = (props) => {
    return (
        <List title={translate('profession_chapters')} perPage={25} sort={{ field: 'name', order: 'ASC' }} {...props} filters={<ChapterFilter />} >
            <Datagrid>
                <TextField source="id" label={'#'}/>
                <TextField source="name" label={translate('chapters_fields.subject_names')}/>
                <TextField source="chapterQuestionsCount" label={translate('chapters_fields.qws_qnty')}/>
                <OldSchoolMenuLink label={translate('chapters_fields.action')} source="chapters" style={{cursor: 'pointer'}} {...props}/>
            </Datagrid>
        </List>
    );
};
function OldSchoolMenuLink({ label, history, record }) {
    return (
        <div className={"active"} onClick={() => {
            history.push({
                pathname: `/questions/list?chapterId=${record.id}`,
            });
        }}>
            <Button variant="outlined" color="primary">Questions</Button>
        </div>
    );
}


