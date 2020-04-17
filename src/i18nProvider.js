import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './i18n/en';
import russianMessages from './i18n/ru';
import ukrainianMessages from './i18n/ua';

const messages = {
    ru: () => import('./i18n/ru.js').then(messages => messages.default),
    ua: () => import('./i18n/ua.js').then(messages => messages.default),
};

const messages_list = {
    ru: russianMessages,
    ua: ukrainianMessages,
    en: englishMessages,
};

export default polyglotI18nProvider(locale => {
    console.log(locale);
    const currentLocale = localStorage.getItem('lang');
    if (!currentLocale) {
        localStorage.setItem('lang', locale);
    }
    if (locale === 'ru') {
        return messages[locale]();
    }
    if (locale === 'ua') {
        return messages[locale]();
    }
    // Always fallback on english
    return englishMessages;
}, 'en');

export const translate = (key) => {
    const lang = localStorage.getItem('lang');
    const getValue = (index, key, keyList, obj) => {
        if (keyList.indexOf(key) === (keyList.length - 1)) {
            return obj;
        }
        return getValue(index + 1, keyList[index + 1], keyList, obj[keyList[index + 1]]);
    };
    const keyList = key.split('.');
    return getValue(0, keyList[0], keyList, messages_list[lang][keyList[0]]);
};
