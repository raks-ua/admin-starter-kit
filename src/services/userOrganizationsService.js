import { ServerService } from "./serverService";

let instance = null;
const serverService = new ServerService();

export class UserOrganizationsService {

    constructor() {
        if (!instance) {
            instance = this;
            this._userOrganizationsList = [];
            this.getUserOrganizationsList();
        }
        return instance;
    }

    getUserOrganizationsList() {
        return serverService.remote('admGetUserOrganizations')
            .then((data) => {
                console.log(data);
                this.make(data.data.organizations);
            })
    }

    make(organizations) {
        return this._userOrganizationsList = organizations;
    }

    get userOrganizations() {
        return this._userOrganizationsList;
    }
}
