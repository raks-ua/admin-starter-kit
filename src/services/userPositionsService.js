import { ServerService } from "./serverService";

let instance = null;
const serverService = new ServerService();

export class UserPositionsService {

    constructor() {
        if (!instance) {
            instance = this;
            this._userPositionsList = [];
            this.getUserPositionsList();
        }
        return instance;
    }

    getUserPositionsList() {
        return serverService.remote('admGetUserPositions')
            .then((data) => {
                console.log(data);
                this.make(data.data.positions);
            })
    }

    make(positions) {
        return this._userPositionsList = positions;
    }

    get userPositions() {
        return this._userPositionsList;
    }
}
