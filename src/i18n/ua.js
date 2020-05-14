import ukrainianMessages from 'ra-language-ukrainian';

export const messages = {
    simple: {
        action: {
            close: 'Close',
            resetViews: 'Reset views',
        },
        buttons: {
            editButton: 'Редагувати',
            deleteButton: 'Видалити'
        }
    },
    ...ukrainianMessages,
    resources: {
        users: {
            name: 'Користувачі',
            nameAll: 'Всі користувачі',
            fields: {
                id: 'ID',
                en: 'Англ',
                login: 'Логін',
                name: 'П.І.Б',
                license: 'Свідоцтво',
                type: 'Тип',
                permission: 'Дозвіл',
                organization: 'Організація',
                actions: 'Дія'
            },
        },
        apps: {
            name: 'додаток',
            nameAll: 'Всі додатки',
            fields: {
                id: 'ID',
                app_id: 'ID додатка',
                name: 'Ім\'я',
                created: 'Створено'
            },
        },
        messageTemplates: {
            name: 'Шаблони повідомлень',
            nameAll: 'Всі шаблони повідомлень',
            fields: {
                id: 'ID',
                key: 'Ключ',
                template: 'Шаблон',
                data: 'Інформація',
                language: 'Мова',
                app: 'Додаток',
                created: 'Створено',
            },
        },
    },
    language: 'Мова',
    list: {
        search: 'Пошук',
        name: 'Ім\'я'
    },
};

export default messages;
