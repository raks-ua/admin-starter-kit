import { ServerService } from "./serverService";

let instance = null;
const serverService = new ServerService();

export class UserPermissionsService {

    constructor() {
        if (!instance) {
            instance = this;
            this._userPermissionsList = [];
            this.getUserPermissionsList();
        }
        return instance;
    }

    getUserPermissionsList() {
        return serverService.remote('admGetUserPermissions')
            .then((data) => {
                console.log(data);
                this.make(data.data.permissions);
            })
    }

    make(permissions) {
        return this._userPermissionsList = permissions;
    }

    get userPermissions() {
        return this._userPermissionsList;
    }
}
