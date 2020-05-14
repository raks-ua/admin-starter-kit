import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'admin-on-rest';
import {CacheService} from "./casheService";
import {stringify} from 'query-string';
import {MICROSERVICE} from './local';
//import uuid from "uuid/v1";
const cacheService = new CacheService();

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    //const requestId = uuid();
    //const sid = localStorage.getItem('sid');
    //const data = {requestId, params: {sessionId: sid, filters: params.filter, sort: params.sort}};

    console.log('REQUEST', type, resource, params);
    switch (type) {
        case GET_LIST: {
            const {page, perPage} = params.pagination;
            const {field, order} = params.sort;
            const query = {
                sort: JSON.stringify({field, order}),
                page,
                per_page: perPage,
                filter: JSON.stringify(params.filter),
            };
            url = `${MICROSERVICE.API}/${resource}?${stringify(query)}`;
            /*switch (resource) {
              se 'users': {
                 url = `${API_URL}/rpc?name=admGetAllUsers`;
                 options.method = 'POST';
                 data.name = 'admGetAllUsers';
                 data.params.perPage = params.pagination.perPage;
                 data.params.pageNum = params.pagination.page;
                 data.params.sortField = params.sort.field;
                 data.params.sortOrder = params.sort.order;
                 options.body = JSON.stringify(data);
                 break;
             }
                default: {

                }
            }*/
            break;
        }
        case GET_ONE:
            console.log('getting one')
            url = `${MICROSERVICE.API}/${resource}/${params.id}`;
            break;
        case GET_MANY: {
            const query = {
                filter: JSON.stringify({id: params.ids}),
            };
            url = `${MICROSERVICE.API}/${resource}?${stringify(query)}`;
            console.log(url);
            break;
        }
        case GET_MANY_REFERENCE: {
            const {page, perPage} = params.pagination;
            const {field, order} = params.sort;
            const query = {
                sort: JSON.stringify({field, order}),
                range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                filter: JSON.stringify({...params.filter, [params.target]: params.id}),
            };
            url = `${MICROSERVICE.API}/${resource}?${stringify(query)}`;
            break;
        }
        case UPDATE:
            url = `${MICROSERVICE.API}/${resource}/${params.id}`;
            options.method = 'PUT';
            options.body = JSON.stringify(params.data);
            break;
        case CREATE:
            url = `${MICROSERVICE.API}/${resource}`;
            options.method = 'POST';
            options.body = JSON.stringify(params.data);
            break;
        case DELETE:
            url = `${MICROSERVICE.API}/${resource}/${params.id}`;
            options.method = 'DELETE';
            break;
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
    return {url, options};
};

/**
 *
 * @param {string} resource
 * @param {Object} filter
 * @param sort
 * @returns {string}
 */
const getCacheKey = (resource, filter, sort) => {

    if (sort === undefined) {
        sort = {field: 'id', order: 'DESC'};
    }
    if (filter === undefined) {
        filter = {};
    }
    if (Object.keys(filter).length) {
        // `${resource}-${filterNameA}-${filterNameB}-${filterNameC}-${filterValueA}-${filterValueB}-${filterValueC}`
        let key = `${resource}-${sort['field']}-${sort.order}-`;
        // Sort filter keys by alfabets
        const filterKeys = Object.keys(filter).sort();
        // convert array to string, concat with key
        key += filterKeys.join('-').replace(/\s/g, '_');
        // concat filter values to key
        filterKeys.forEach((propName) => {
            key += '-' + filter[propName].toString().replace(/\s/g, "_");
            console.log('KEY-----', key);
        });
        return key.toLowerCase();
    } else {
        return (`${resource}-${sort['field']}-${sort.order}`).toLowerCase();
    }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
    const {json} = response;
    console.log('convertHTTPResponseToREST', json, type);
    switch (type) {
        case GET_LIST:
            console.log(resource, json.data, json.data[resource.toLowerCase()], params);
            const key = getCacheKey(resource, params.filter, params.sort);
            console.log(key);
            json.data[resource.toLowerCase()].forEach((item, i) => item.num = i);
            let data, total;
            cacheService.set(key, json.data[resource], params.pagination.perPage, json.data.total, params.pagination.page - 1);
            data = cacheService.get(key, params.pagination.perPage, params.pagination.page - 1).data;
            total = cacheService.get(key, params.pagination.perPage, params.pagination.page - 1).total;
            console.log('TOTAL', data, total);
            return getData(data, total, params);
        case GET_MANY_REFERENCE:

            var jsonData = json.data.map(function (dic) {
                var interDic = Object.assign(
                    {id: dic.id},
                    dic.attributes,
                    dic.meta
                );
                if (dic.relationships) {
                    Object.keys(dic.relationships).forEach(function (key) {
                        var keyString = key + "_id";
                        if (dic.relationships[key].data) {
                            //if relationships have a data field --> assume id in data field
                            interDic[keyString] = dic.relationships[key].data.id;
                        } else if (dic.relationships[key].links) {
                            //if relationships have a link field
                            var link = dic.relationships[key].links["self"];
                            this(link).then(function (response) {
                                interDic[key] = {
                                    data: response.json.data,
                                    count: response.json.data.length
                                };
                                interDic["count"] = response.json.data.length;
                            });
                        }
                    });
                }
                return interDic;
            });
            return {data: json.data, total: json.meta["total"]};
        case GET_MANY:
            console.log('GET_MANY_REFERENCE', json.data);
            jsonData = json.data[resource].map(function (obj) {
                console.log(obj);

                return Object.assign({id: obj.id}, obj);
            });
            console.log(jsonData);
            return {data: jsonData};

        case UPDATE:
        case CREATE:
            return {
                data: Object.assign({id: json.data.id}, json.data.attributes)
            };
        case DELETE:
            return {data: json};
        default:
            console.log('Def', json)
            return {data: json.data};
    }
};

const getData = (list, total, params, customList = []) => {
    if (Object.keys(params.sort).length) {
        if (params.sort.order === 'ASC') {
            customList = list.sort((a, b) => {
                if (a[params.sort.field] > b[params.sort.field]) {
                    return 1;
                }
                if (a[params.sort.field] < b[params.sort.field]) {
                    return -1;
                }
                return 0;
            })
        }
        if (params.sort.order === 'DESC') {
            customList = list.sort((a, b) => {
                if (a[params.sort.field] > b[params.sort.field]) {
                    return -1;
                }
                if (a[params.sort.field] < b[params.sort.field]) {
                    return 1;
                }
                return 0;
            })
        }
    }

    customList.forEach((item, i) => {
        if (params.pagination.page > 1) {
            item.num = (i + 1) + ((params.pagination.page * params.pagination.perPage) - params.pagination.perPage);
        } else {
            item.num = i + 1;
        }
    });
    return {
        data: customList,
        total: total,
    };
};

/**
 * Maps admin-on-rest queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param params
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
    const {fetchJson} = fetchUtils;
    const {url, options} = convertRESTRequestToHTTP(type, resource, params);
    console.log('2', url, options);
    return fetchJson(url, options)
        .then(response => {
            console.log('response', response)
            // Handling errors from server
            if (response.json.code < 200 || response.json.code >= 300) {
                return Promise.reject({
                    message: {
                        status: response.json.code,
                        message: response.json.message
                    }
                });
            }
            return response;
        })
        .then(response => convertHTTPResponseToREST(response, type, resource, params))

};
