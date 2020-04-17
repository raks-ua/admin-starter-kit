import ukrainianMessages from 'ra-language-ukrainian';

export const messages = {
    simple: {
        action: {
            close: 'Close',
            resetViews: 'Reset views',
        },
    },
    ...ukrainianMessages,
    resources: {
        users: {
            name: 'Користувачі',
            nameAll: 'Всі користувачі',
            fields: {
                id: 'ID',
                en: 'Англ',
                login: 'Ім\'я',
                name: "Прізвище",
                license: 'Свідоцтво',
                type_of_aircraft: 'Тип ПС',
                raiting: 'Рейтинг',
                type: 'Тип',
                permission: 'Дозвіл',
                organization: 'Організація',
                actions: 'Дія'
            },
        },
    },
    language: 'Мова',
    testing: 'Тестування',
    question_bank: 'База питань',
    professions: {
        administration: 'Адміністрація',
        cabin_crew_member: 'Бортпровідники',
        flight_crew_member: 'FLIGHT CREW MEMBER',
        maintenance_personal: 'Персонал КІТО',
        non_flying_personell: 'Non Flying Personell',
        occ: 'Льотні диспетчери'
    },
    profession_chapters: 'Profession Chapters',
    chapters_fields: {
        subject_names: 'SUBJECT NAMES',
        qws_qnty: 'QWS QNTY',
        actions: 'ДІЯ'
    },
    chapter_questions: 'Chapter Questions',
    question_fields: {
        questions: 'QUESTIONS',
        answer_count: 'ANSWER COUNT',
        position: 'POSITION',
        action: 'ДІЯ'
    },
    list: {
        search: 'Пошук',
        name: 'Ім\'я'
    },
};

export default messages;
