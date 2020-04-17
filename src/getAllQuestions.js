import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';
import { translate } from "./i18nProvider";

export const QuestionList = (props) => (
    <List title={translate('chapter_questions')} perPage={25} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="question" label={translate('question_fields.questions')}/>
            <TextField source="questionAnswersCount" label={translate('question_fields.answer_count')}/>
            {/*<TextField label={translate('question_fields.position')}/>*/}
            {/*<TextField label={translate('question_fields.action')}/>*/}
        </Datagrid>
    </List>
);
