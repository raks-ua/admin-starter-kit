let instance = null;

class CacheItem {
    constructor(item) {
        this.data = item.data;
        this.total = item.total
    }
}
export class CacheService {

    constructor() {
        if (!instance) {
            instance = this;
            this._data = new Map();
        }
        return instance;
    }

    /**
     *
     * @param {string} key
     * @param {Array} value
     * @param {int} num
     * @param {int} total - Per page
     * @param {int} filterNum - Page number
     */
    set(key, value, num, total, filterNum) {
        if (this.has(key)) {
            const currentData = this._data.get(key);
            if (currentData[filterNum]) {
                currentData[filterNum][num] = new CacheItem({data: value, total: total});
            } else {
                currentData[filterNum] = {};
                currentData[filterNum][num] = new CacheItem({data: value, total: total});
            }
        } else {
            const cacheItem = new CacheItem({data: value, total: total});
            const newData = {};
            newData[filterNum] = {};
            newData[filterNum][num] = cacheItem;
            this._data.set(key, newData);
        }
    }

    get(key, num, filterNum) {
        if (this.has(key)) {
            const data = this._data.get(key);
            if (data[filterNum]) {
                return data[filterNum][num]
            } else {
                return data[filterNum];
            }
        } else {
            return null
        }
    }

    has(key) {
        return this._data.has(key);
    }
}

