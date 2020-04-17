import englishMessages from 'ra-language-english';

export const messages = {
    simple: {
        action: {
            close: 'Close',
            resetViews: 'Reset views',
        },
    },
    ...englishMessages,
    resources: {
        users: {
            name: 'Users',
            nameAll: 'All users',
            fields: {
                id: 'ID',
                en: 'En',
                login: 'Login',
                name: 'Name',
                license: 'License',
                type_of_aircraft: 'Type of aircraft',
                raiting: 'Raiting',
                type: 'Type',
                permission: 'Permission',
                organization: 'Organization',
                actions: 'Actions'
            },
        },
    },
    language: 'Language',
    testing: 'Testing',
    question_bank: 'Question bank',
    professions: {
        administration: 'ADMINISTRATION',
        cabin_crew_member: 'CABIN CREW MEMBER1',
        flight_crew_member: 'FLIGHT CREW MEMBER',
        maintenance_personal: 'Maintenance personal',
        non_flying_personell: 'Non Flying Personell',
        occ: 'OCC'
    },
    profession_chapters: 'Profession Chapters',
    chapters_fields: {
        subject_names: 'SUBJECT NAMES',
        qws_qnty: 'QWS QNTY',
        actions: 'ACTIONS'
    },
    chapter_questions: 'Chapter Questions',
    question_fields: {
        questions: 'QUESTIONS',
        answer_count: 'ANSWER COUNT',
        position: 'POSITION',
        action: 'ACTION'
    },
    list: {
        search: 'Search',
        name: 'Name'
    },
};

export default messages;
