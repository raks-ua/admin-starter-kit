import { ServerService } from "./serverService";

let instance = null;
const serverService = new ServerService();

export class UserTypesService {

    constructor() {
        if (!instance) {
            instance = this;
            this._userTypeList = [];
            this.getUserTypesList();
        }
        return instance;
    }

    getUserTypesList() {
        return serverService.remote('admGetUserTypes')
            .then((data) => {
                console.log(data);
                this.make(data.data.types);
            })
    }

    make(types) {
        return this._userTypeList = types;
    }

    get userTypes() {
        return this._userTypeList;
    }
}
