import englishMessages from 'ra-language-english';

export const messages = {
    simple: {
        action: {
            close: 'Close',
            resetViews: 'Reset views',
        },
        buttons:{
            editButton: 'Edit',
            deleteButton: 'Delete'
        }
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
        apps: {
            name: 'app',
            nameAll: 'Apps',
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
        messageTemplates: {
            name: 'Message Templates',
            nameAll: 'All message templates',
            fields: {
                id: 'ID',
                app: 'App',
                language: 'Language',
                type: 'Type',
                key: 'Key',
                template: 'Message Template',
                data: 'Data',
                created: 'Created'
            },
        },
    },
    language: 'Language',
    list: {
        search: 'Search',
        name: 'Name'
    },
};

export default messages;
