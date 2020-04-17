import { ServerService } from "./serverService";

let instance = null;
const serverService = new ServerService();

export class UserFlyTypesService {

    constructor() {
        if (!instance) {
            instance = this;
            this._userFlyTypesList = [];
            this.getUserFlyTypesList();
        }
        return instance;
    }

    getUserFlyTypesList() {
        return serverService.remote('admGetUserFlyTypes')
            .then((data) => {
                console.log(data);
                this.make(data.data.flyTypes);
            })
    }

    make(flyTypes) {
        return this._userFlyTypesList = flyTypes;
    }

    get userFlyTypes() {
        return this._userFlyTypesList;
    }
}
