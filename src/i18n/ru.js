import russianMessages from 'ra-language-russian';

export const messages = {
    simple: {
        action: {
            close: 'Close',
            resetViews: 'Reset views',
        },
    },
    ...russianMessages,
    resources: {
        users: {
            name: 'Пользователи',
            nameAll: 'Все пользователи',
            fields: {
                id: 'ID',
                en: 'Англ',
                login: 'Логин',
                name: 'Ф.И.О',
                license: 'Свидетельство',
                type_of_aircraft: 'Тип ВС',
                raiting: 'Рейтинг',
                type: 'Тип',
                permission: 'Разрешение',
                organization: 'Организация',
                actions: 'Действие'
            },
        },
    },
    language: 'Язык',
    testing: 'Тестирование',
    question_bank: 'База вопросов',
    professions: {
        administration: 'Администрация',
        cabin_crew_member: 'Бортпроводники',
        flight_crew_member: 'FLIGHT CREW MEMBER',
        maintenance_personal: 'Персонал КИТО',
        non_flying_personell: 'Non Flying Personell',
        occ: 'Лётные диспетчеры'
    },
    profession_chapters: 'Profession Chapters',
    chapters_fields: {
        subject_names: 'SUBJECT NAMES',
        qws_qnty: 'QWS QNTY',
        actions: 'ДЕЙСТВИЕ'
    },
    chapter_questions: 'Chapter Questions',
    question_fields: {
        questions: 'QUESTIONS',
        answer_count: 'ANSWER COUNT',
        position: 'POSITION',
        action: 'Действие'
    },
    list: {
        search: 'Поиск',
        name: 'Имя'
    },
};

export default messages;
