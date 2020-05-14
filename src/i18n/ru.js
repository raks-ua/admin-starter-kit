import russianMessages from 'ra-language-russian';

export const messages = {
    simple: {
        action: {
            close: 'Close',
            resetViews: 'Перезавантажити вигляд',
        },
        buttons: {
            editButton: 'Редактировать',
            deleteButton: 'Удалить'
        }
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
        apps: {
            name: 'приложение',
            nameAll: 'Все приложения',
            fields: {
                id: 'ID',
                app_id: 'ID приложения',
                name: 'Имя',
                created: 'Создано'
            },
        },
        messageTemplates: {
            name: 'Шаблоны сообщений',
            nameAll: 'Все шаблоны сообщений',
            fields: {
                id: 'ID',
                key: 'Ключ',
                template: 'Шаблон',
                data: 'Информация',
                language: 'Язык',
                app: 'Приложение',
                created: 'Создано',
            },
        },
    },
    language: 'Язык',
    list: {
        search: 'Поиск',
        name: 'Имя'
    },
};

export default messages;
